variable "linode_token" {
  type        = string
  description = "Linode API token with create permissions."
}

variable "ssh_public_key" {
  type        = string
  description = "SSH public key for instance access."
}

variable "root_password" {
  type      = string
  sensitive = true
  description = "Root password fallback (optional if you rely on SSH key only)."
}