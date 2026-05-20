terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.45.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "3.2.4"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.9.0"
    }
  }
  required_version = ">= 1.14.0"
}
