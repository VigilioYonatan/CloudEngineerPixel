# Google Cloud Enterprise IaC + FinOps Baseline (Modalidad C · Revisión Estática)
# Validación sin credenciales: terraform init -backend=false && terraform fmt -check && terraform validate
# ADVERTENCIA DE COSTO: Ejecutar únicamente en un proyecto GCP efímero con cuota limitada.

terraform {
  required_version = ">= 1.6.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.14"
    }
  }
}

variable "project_id" {
  type        = string
  default     = "cea-sandbox-project-example"
  description = "ID del proyecto GCP aislado de laboratorio"
}

variable "region" {
  type        = string
  default     = "us-central1"
  description = "Región primaria para subredes regionales"
}

variable "environment" {
  type    = string
  default = "sandbox"
  validation {
    condition     = contains(["sandbox", "lab"], var.environment)
    error_message = "Solo se admite environment = sandbox o lab."
  }
}

locals {
  mandatory_labels = {
    owner       = "student-lab"
    environment = var.environment
    cost_center = "cc-academy-001"
    expires_at  = "2026-12-31"
    managed_by  = "terraform"
  }
}

provider "google" {
  project        = var.project_id
  region         = var.region
  default_labels = local.mandatory_labels
}

resource "google_compute_network" "enterprise_vpc" {
  name                    = "vpc-cea-${var.environment}"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "private_subnet" {
  name                     = "sub-cea-${var.environment}-private"
  ip_cidr_range            = "10.64.10.0/24"
  region                   = var.region
  network                  = google_compute_network.enterprise_vpc.id
  private_ip_google_access = true
}

output "vpc_self_link" {
  description = "Referencia no sensible de la VPC global creada"
  value       = google_compute_network.enterprise_vpc.self_link
}

output "applied_finops_labels" {
  description = "Labels FinOps obligatorias en minúsculas según contrato GCP"
  value       = local.mandatory_labels
}
