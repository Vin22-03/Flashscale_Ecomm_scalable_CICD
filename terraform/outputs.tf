############################################################
# outputs.tf – FlashScale Hybrid GitOps Infra
############################################################

# VPC Outputs
output "vpc_id" {
  description = "VPC ID for FlashScale"
  value       = module.vpc.vpc_id
}

output "public_subnets" {
  description = "Public subnet IDs"
  value       = module.vpc.public_subnets
}

output "private_subnets" {
  description = "Private subnet IDs"
  value       = module.vpc.private_subnets
}

# EKS Outputs
output "eks_cluster_name" {
  description = "EKS Cluster name"
  value       = module.eks.cluster_name
}

output "eks_cluster_endpoint" {
  description = "EKS Cluster endpoint"
  value       = module.eks.cluster_endpoint
}

# ECR Outputs
output "ecr_backend_url" {
  description = "ECR repo URL for backend"
  value       = aws_ecr_repository.backend.repository_url
}

output "ecr_frontend_url" {
  description = "ECR repo URL for frontend"
  value       = aws_ecr_repository.frontend.repository_url
}

# RDS Output
output "rds_endpoint" {
  description = "RDS Postgres endpoint"
  value       = module.rds.db_instance_endpoint
}
