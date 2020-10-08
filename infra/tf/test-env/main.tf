provider "aws" {
  region = "us-west-2"
}

module "github_pages_website" {
  source = "../modules/github_pages_core"
  website_name = random_id.website_name.hex
  github_page_url = random_id.github_page_name.hex
}

resource "random_id" "website_name" {
  byte_length = 4
  prefix = var.name_prefix
}

resource "random_id" "github_page_name" {
  byte_length = 4
  prefix = "${var.github_page_url_prefix}-"
}
