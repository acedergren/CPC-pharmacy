resource "linode_instance" "cpc_demo" {
  label           = "cpc-demo"
  region          = "eu-central"        # Frankfurt (closest to Stockholm)
  type            = "g6-nanode-1"       # Nanode
  image           = "linode/ubuntu20.04" 
  root_pass       = var.root_password
  authorized_keys = [var.ssh_public_key]

  # Use the StackScript we just created:
  stackscript_id   = linode_stackscript.cpc_demo.id
  stackscript_data = {}  # our script is self-contained, no user-defined fields needed
}