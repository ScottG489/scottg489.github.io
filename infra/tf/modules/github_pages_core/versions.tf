terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.25.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "3.2.4"
    }
  }
  required_version = ">= 0.13"
}
