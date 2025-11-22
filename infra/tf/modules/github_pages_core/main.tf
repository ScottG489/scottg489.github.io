resource "aws_route53_zone" "r53_zone" {
  name         = var.website_name
}

resource "aws_route53_record" "website_r53_record_CNAME_www" {
  zone_id = aws_route53_zone.r53_zone.id
  name    = "www"
  type    = "CNAME"
  ttl     = "300"

  records = [
    var.github_page_url
  ]
}

resource "aws_route53_record" "website_r53_record_A_top" {
  zone_id = aws_route53_zone.r53_zone.id
  name    = ""
  type    = "A"
  ttl     = "300"

  records = var.github_pages_ips
}
