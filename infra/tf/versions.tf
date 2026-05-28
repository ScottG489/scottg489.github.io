terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.47.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "3.3.0"
    }
  }
  required_version = ">= 1.14.0"
}
