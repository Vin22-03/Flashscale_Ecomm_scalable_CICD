############################################################
# variables.tf – FlashScale Infra Variables
############################################################

# Project Name (used as prefix for resources)
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

# RDS Password (Sensitive)
variable "db_password" {
  description = "Password for the RDS Postgres database"
  type        = string
  sensitive   = true
}
