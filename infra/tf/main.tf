provider "aws" {
  region = "us-west-2"
}

terraform {
  backend "s3" {
    # TODO: Don't want this hardcoded but backends don't allow variables
    bucket = "tfstate-github-pages"
    key    = "app.tfstate"
    region = "us-west-2"
  }
}

module "github_pages_website" {
  source = "./modules/github_pages_core"
  website_name = var.website_name
  github_page_url = var.github_page_url
}

module "helpers_route53_domain_name_servers" {
  source  = "ScottG489/helpers/aws//modules/route53_domain_name_servers"
  version = "1.5.0"
  route53_zone_name = module.github_pages_website.r53_zone_name
  route53_zone_name_servers = module.github_pages_website.r53_zone_name_servers
}
