############################################################
# variables.tf – FlashScale Hybrid GitOps Infra
############################################################

variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "project" {
  description = "Project name prefix for all resources"
  type        = string
  default     = "flashscale"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "db_password" {
  description = "Password for RDS Postgres database"
  type        = string
  sensitive   = true
}
