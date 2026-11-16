# LAB GCP · VPC custom y subred regional sin VMs ni gateways.
# IMPORTANTE: revisa precios, permisos y cuotas antes de aplicar.
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    google = { source = "hashicorp/google", version = "~> 6.0" }
  }
}
variable "project_id" { type = string; description = "ID de un proyecto GCP propio con facturación controlada" }
variable "region" { type = string; default = "us-central1" }
provider "google" { project = var.project_id; region = var.region }
resource "google_compute_network" "lab" {
  name = "cloud-academy-lab"
  auto_create_subnetworks = false
}
resource "google_compute_subnetwork" "private" {
  name = "cloud-academy-private"
  ip_cidr_range = "10.42.10.0/24"
  network = google_compute_network.lab.id
  region = var.region
}
output "vpc_id" { value = google_compute_network.lab.id }
