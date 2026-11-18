# AWS Enterprise IaC + FinOps Baseline (Modalidad C · Revisión Estática)
# Validación sin credenciales: terraform init -backend=false && terraform fmt -check && terraform validate
# ADVERTENCIA DE COSTO: Aplicar en cuenta sandbox aislada; ejecutar siempre terraform destroy verificado al cerrar.

terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
  }
}

variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "Región aislada del laboratorio AWS"
}

variable "owner_email" {
  type        = string
  default     = "student-lab@example.org"
  description = "Responsable técnico del laboratorio para trazabilidad FinOps"
}

variable "environment" {
  type        = string
  default     = "sandbox"
  description = "Entorno permitido únicamente para estudio"
  validation {
    condition     = contains(["sandbox", "lab"], var.environment)
    error_message = "Por seguridad, este módulo educativo solo admite environment = sandbox o lab."
  }
}

variable "cost_center" {
  type        = string
  default     = "CC-ACADEMY-001"
  description = "Centro de costos FinOps obligatorio"
}

variable "expires_at" {
  type        = string
  default     = "2026-12-31"
  description = "Fecha ISO límite para auditoría de recursos huérfanos"
}

locals {
  mandatory_tags = {
    Owner       = var.owner_email
    Environment = var.environment
    CostCenter  = var.cost_center
    ExpiresAt   = var.expires_at
    ManagedBy   = "Terraform"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = local.mandatory_tags
  }
}

resource "aws_vpc" "enterprise_lab" {
  cidr_block           = "10.44.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "cea-${var.environment}-vpc"
  }
}

resource "aws_flow_log" "vpc_rejection_audit" {
  vpc_id               = aws_vpc.enterprise_lab.id
  traffic_type         = "REJECT"
  log_destination_type = "cloud-watch-logs"
  log_destination      = aws_cloudwatch_log_group.vpc_flow.arn
  iam_role_arn         = aws_iam_role.flow_logs_role.arn
}

resource "aws_cloudwatch_log_group" "vpc_flow" {
  name              = "/aws/vpc/cea-${var.environment}-rejections"
  retention_in_days = 7
}

resource "aws_iam_role" "flow_logs_role" {
  name = "cea-${var.environment}-vpc-flow-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "vpc-flow-logs.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

output "enterprise_vpc_id" {
  description = "Identificador no sensible de la VPC creada"
  value       = aws_vpc.enterprise_lab.id
}

output "applied_finops_tags" {
  description = "Etiquetas FinOps obligatorias aplicadas por defecto"
  value       = local.mandatory_tags
}
