terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# -----------------
# Networking
# -----------------
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.2"

  name = "${var.project}-vpc"
  cidr = var.vpc_cidr

  azs             = slice(data.aws_availability_zones.available.names, 0, 2)
  public_subnets  = [for i in range(2) : cidrsubnet(var.vpc_cidr, 4, i)]
  private_subnets = [for i in range(2,4) : cidrsubnet(var.vpc_cidr, 4, i)]

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = {
    Project = var.project
  }
}

data "aws_availability_zones" "available" {}

# -----------------
# EKS Cluster
# -----------------
module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "20.8.4"
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

  tags = {
    Project = var.project
  }
}

# -----------------
# ECR Repos
# -----------------
resource "aws_ecr_repository" "backend" {
  name = "${var.project}-backend"
  force_delete = true
}

resource "aws_ecr_repository" "frontend" {
  name = "${var.project}-frontend"
  force_delete = true
}
