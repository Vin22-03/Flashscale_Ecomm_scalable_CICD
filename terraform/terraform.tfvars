region     = "us-east-1"
project    = "flashscale"
vpc_cidr   = "10.0.0.0/16"
db_password = "StrongPassword123!"

# 🔧 Fix for Autoscaler
cluster_autoscaler_cluster_names = ["flashscale-eks"]

# 🔧 Fix for RDS
family = "postgres15"
