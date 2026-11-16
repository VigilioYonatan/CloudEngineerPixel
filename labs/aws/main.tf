# LAB AWS · VPC segura, sin VMs, NAT Gateways ni recursos de pago significativo.
# IMPORTANTE: revisa precios, permisos y cuotas antes de aplicar.
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}
provider "aws" { region = var.region }
variable "region" { type = string; default = "us-east-1" }
variable "project" { type = string; default = "cloud-academy-lab" }
resource "aws_vpc" "lab" {
  cidr_block = "10.42.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = var.project, Environment = "lab", ManagedBy = "Terraform" }
}
resource "aws_subnet" "private" {
  vpc_id = aws_vpc.lab.id
  cidr_block = "10.42.10.0/24"
  tags = { Name = "${var.project}-private", Environment = "lab" }
}
output "vpc_id" { value = aws_vpc.lab.id }
output "private_subnet_id" { value = aws_subnet.private.id }
