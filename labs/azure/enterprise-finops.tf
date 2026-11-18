# Azure Enterprise IaC + FinOps Baseline (Modalidad C · Revisión Estática)
# Validación sin credenciales: terraform init -backend=false && terraform fmt -check && terraform validate
# ADVERTENCIA DE COSTO: Usar suscripción de laboratorio aislada con presupuesto activo y destruir al finalizar.

terraform {
  required_version = ">= 1.6.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.14"
    }
  }
}

provider "azurerm" {
  features {}
}

variable "location" {
  type        = string
  default     = "eastus2"
  description = "Región Azure del laboratorio"
}

variable "owner_email" {
  type        = string
  default     = "student-lab@example.org"
  description = "Responsable del grupo de recursos efímero"
}

variable "environment" {
  type        = string
  default     = "sandbox"
  validation {
    condition     = contains(["sandbox", "lab"], var.environment)
    error_message = "Solo se permite environment = sandbox o lab."
  }
}

variable "cost_center" {
  type    = string
  default = "CC-ACADEMY-001"
}

variable "expires_at" {
  type    = string
  default = "2026-12-31"
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

resource "azurerm_resource_group" "enterprise_lab" {
  name     = "rg-cea-${var.environment}-network"
  location = var.location
  tags     = local.mandatory_tags
}

resource "azurerm_virtual_network" "enterprise_vnet" {
  name                = "vnet-cea-${var.environment}"
  address_space       = ["10.54.0.0/16"]
  location            = azurerm_resource_group.enterprise_lab.location
  resource_group_name = azurerm_resource_group.enterprise_lab.name
  tags                = local.mandatory_tags
}

resource "azurerm_network_security_group" "private_nsg" {
  name                = "nsg-cea-${var.environment}-private"
  location            = azurerm_resource_group.enterprise_lab.location
  resource_group_name = azurerm_resource_group.enterprise_lab.name
  tags                = local.mandatory_tags
}

output "resource_group_name" {
  description = "Grupo de recursos aislado para cleanup determinista"
  value       = azurerm_resource_group.enterprise_lab.name
}

output "applied_finops_tags" {
  description = "Etiquetas FinOps obligatorias aplicadas"
  value       = local.mandatory_tags
}
