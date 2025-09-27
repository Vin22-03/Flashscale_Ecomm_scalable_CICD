############################################################
# main.tf – FlashScale Infra (Hybrid GitOps Ready)
# Components: VPC + EKS + IRSA + ECR + RDS
# Note: ArgoCD will be deployed separately via Helm/kubectl
############################################################

terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.30"
    }
  }
}

provider "aws" {
  region = var.region
}

data "aws_availability_zones" "available" {}
data "aws_caller_identity" "current" {}

############################################################
# VPC
############################################################
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.2"

  name = "${var.project}-vpc"
  cidr = var.vpc_cidr

  azs             = slice(data.aws_availability_zones.available.names, 0, 2)
  public_subnets  = [for i in range(2) : cidrsubnet(var.vpc_cidr, 4, i)]
  private_subnets = [for i in range(2, 4) : cidrsubnet(var.vpc_cidr, 4, i)]

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = { Project = var.project }
}

############################################################
# EKS Cluster
############################################################
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.8.4"

  cluster_name    = "${var.project}-eks"
  cluster_version = "1.29"
  subnet_ids      = module.vpc.private_subnets
  vpc_id          = module.vpc.vpc_id

  eks_managed_node_groups = {
    default = {
      instance_types = ["t3.small"]
      desired_size   = 2
      min_size       = 1
      max_size       = 3
    }
  }

  enable_irsa = true   # enables OIDC provider for IRSA

  tags = { Project = var.project }
}

############################################################
# IAM Roles for Service Accounts (IRSA)
############################################################

# ALB Ingress Controller Role
module "alb_irsa" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "5.34.0"

  role_name                              = "${var.project}-alb-controller"
  attach_load_balancer_controller_policy = true

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["kube-system:aws-load-balancer-controller"]
    }
  }
}

# Cluster Autoscaler Role
module "autoscaler_irsa" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "5.34.0"

  role_name                        = "${var.project}-cluster-autoscaler"
  attach_cluster_autoscaler_policy = true

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["kube-system:cluster-autoscaler"]
    }
  }

  # Avoid coalescelist error
  cluster_autoscaler_cluster_names = var.cluster_autoscaler_cluster_names
  cluster_autoscaler_cluster_ids   = var.cluster_autoscaler_cluster_ids
}

############################################################
# ECR Repositories
############################################################
resource "aws_ecr_repository" "backend" {
  name         = "${var.project}-backend"
  force_delete = true
}

resource "aws_ecr_repository" "frontend" {
  name         = "${var.project}-frontend"
  force_delete = true
}

############################################################
# Security Group for RDS
############################################################
resource "aws_security_group" "rds_sg" {
  name        = "${var.project}-rds-sg"
  description = "Security group for RDS in ${var.project}"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description = "Postgres from within VPC"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr] # limit to VPC range
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Project = var.project }
}

############################################################
# RDS (Postgres)
############################################################
module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "6.5.2"

  identifier        = "${var.project}-db"
  engine            = "postgres"
  engine_version    = "15" # let AWS pick supported minor
  instance_class    = "db.t3.micro"
  allocated_storage = 20

  db_name  = "flashscaledb"
  username = "flashadmin"
  password = var.db_password
  port     = 5432

  family = var.family

  publicly_accessible = false
  multi_az            = false
  skip_final_snapshot = true

  # ✅ Required fix
  subnet_ids             = module.vpc.private_subnets
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  tags = { Project = var.project }
}

############################################################
# 🚫 ArgoCD
# Removed from infra stack to avoid i/o timeout.
# Deploy it later with Helm once kubeconfig is working.
############################################################
