terraform {
  backend "s3" {
    bucket         = "flashscale-terraform-state"   # S3 bucket name
    key            = "infra/terraform.tfstate"      # path inside bucket
    region         = "us-east-1"
    dynamodb_table = "flashscale-terraform-lock"    # state lock
    encrypt        = true
  }
}
