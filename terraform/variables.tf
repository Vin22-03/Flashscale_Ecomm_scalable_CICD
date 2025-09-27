############################################################
# variables.tf – FlashScale Infra Variables (updated)
############################################################

# Project Name
variable "project" {
  description = "Project name prefix for resources"
  type        = string
  default     = "flashscale"
}

# AWS Region
variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

# VPC CIDR
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# RDS Password
variable "db_password" {
  description = "Password for the RDS Postgres database"
  type        = string
  sensitive   = true
}

# RDS Parameter Group Family (must match DB engine)
variable "family" {
  description = "RDS parameter group family (e.g., postgres14, postgres15)"
  type        = string
  default     = "postgres14"
}

# Cluster Autoscaler cluster names
variable "cluster_autoscaler_cluster_names" {
  description = "List of EKS cluster names for the autoscaler IAM role"
  type        = list(string)
  default     = ["flashscale-eks"]
}

# Cluster Autoscaler cluster IDs (optional)
variable "cluster_autoscaler_cluster_ids" {
  description = "List of EKS cluster IDs for the autoscaler IAM role"
  type        = list(string)
  default     = []
}
