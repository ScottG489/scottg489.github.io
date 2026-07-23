terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.56.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "3.3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.9.0"
    }
  }
  required_version = ">= 1.14.0"
}
