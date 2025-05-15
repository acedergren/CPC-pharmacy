variable "linode_token" {
  type        = string
  description = "Your Linode API token with create permissions."
}

variable "ssh_public_key" {
  type        = string
  description = "Public SSH key for instance access."
}

variable "root_password" {
  type        = string
  description = "Root password (or leave empty to rely solely on SSH)."
  sensitive   = true
}