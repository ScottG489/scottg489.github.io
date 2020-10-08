provider "aws" {
  region = "us-west-2"
}

resource "aws_s3_bucket" "backend_bucket" {
  bucket = var.tfstate_backend_bucket_name
  force_destroy = true

  versioning {
    enabled = true
  }
}
