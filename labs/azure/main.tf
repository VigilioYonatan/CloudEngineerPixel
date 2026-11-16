# LAB AZURE · Grupo de recursos y VNet de prueba sin máquinas virtuales.
# IMPORTANTE: revisa precios, permisos y cuotas antes de aplicar.
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    azurerm = { source = "hashicorp/azurerm", version = "~> 4.0" }
  }
}
provider "azurerm" { features {} }
variable "location" { type = string; default = "eastus" }
variable "project" { type = string; default = "cloud-academy-lab" }
resource "azurerm_resource_group" "lab" {
  name = "rg-${var.project}"
  location = var.location
  tags = { Environment = "lab", ManagedBy = "Terraform" }
}
resource "azurerm_virtual_network" "lab" {
  name = "vnet-${var.project}"
  location = azurerm_resource_group.lab.location
  resource_group_name = azurerm_resource_group.lab.name
  address_space = ["10.42.0.0/16"]
  tags = { Environment = "lab", ManagedBy = "Terraform" }
}
resource "azurerm_subnet" "private" {
  name = "subnet-private"
  resource_group_name = azurerm_resource_group.lab.name
  virtual_network_name = azurerm_virtual_network.lab.name
  address_prefixes = ["10.42.10.0/24"]
}
output "vnet_id" { value = azurerm_virtual_network.lab.id }
