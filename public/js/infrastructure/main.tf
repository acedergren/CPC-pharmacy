resource "linode_instance" "cpc_demo" {
  label      = "cpc-demo"
  region     = "eu-sto"           #  Stockholm
  type       = "g6-nanode-1"          # Nanode
  image      = "linode/ubuntu20.04"
  root_pass  = var.root_password
  authorized_keys = [var.ssh_public_key]
  stackscript_data = file("${path.module}/cloud-config.yml")
  # user_data is only supported via StackScripts
}