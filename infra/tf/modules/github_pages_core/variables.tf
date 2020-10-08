variable "website_name" {}
variable "github_page_url" {}
variable "github_pages_ips" {
  type    = list(string)
  default = [
    "185.199.108.153",
    "185.199.109.153",
    "185.199.110.153",
    "185.199.111.153",
  ]
}
