############################################################
# outputs.tf – FlashScale Infra Outputs
############################################################

# VPC
output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "private_subnets" {
  description = "Private subnet IDs"
  value       = module.vpc.private_subnets
}

output "public_subnets" {
  description = "Public subnet IDs"
  value       = module.vpc.public_subnets
}

# EKS
output "eks_cluster_name" {
  description = "EKS cluster name"
  value       = module.eks.cluster_name
}

output "eks_cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.eks.cluster_endpoint
}

output "eks_oidc_provider_arn" {
  description = "OIDC provider ARN for IRSA"
  value       = module.eks.oidc_provider_arn
}

# IAM IRSA Roles
output "alb_irsa_role_arn" {
  description = "IAM role ARN for ALB Ingress Controller"
  value       = module.alb_irsa.iam_role_arn
}

output "autoscaler_irsa_role_arn" {
  description = "IAM role ARN for Cluster Autoscaler"
  value       = module.autoscaler_irsa.iam_role_arn
}

# ECR
output "backend_ecr_repo_url" {
  description = "Backend ECR repository URL"
  value       = aws_ecr_repository.backend.repository_url
}

output "frontend_ecr_repo_url" {
  description = "Frontend ECR repository URL"
  value       = aws_ecr_repository.frontend.repository_url
}

# RDS
output "rds_endpoint" {
  description = "RDS Postgres endpoint"
  value       = module.rds.db_instance_address
}

output "rds_port" {
  description = "RDS Postgres port"
  value       = module.rds.db_instance_port
}
