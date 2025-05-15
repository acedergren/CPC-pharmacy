resource "linode_stackscript" "cpc_demo" {
  label       = "CPC-Demo-Setup"
  description = "Installs Node.js, clones riktigaapoteket-demo, and runs store + attacker servers via PM2."
  images      = ["linode/ubuntu20.04"]

  script = <<-EOT
    #!/bin/bash
    set -e

    # Ensure apt is up to date
    apt-get update -y

    # Install prerequisites
    apt-get install -y git curl build-essential

    # Install Node.js 18
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs

    # Clone demo repo
    rm -rf /opt/cpc-demo
    git clone https://github.com/yourorg/riktigaapoteket-demo.git /opt/cpc-demo
    cd /opt/cpc-demo

    # Install dependencies
    npm install

    # Install PM2 to manage processes
    npm install -g pm2

    # Start the store (port 80) and attacker server (port 4000)
    pm2 start src/server.js --name cpc-store -- --port 80
    pm2 start attacker-server/attacker-server.js --name cpc-attacker -- --port 4000

    # Save PM2 process list and configure startup
    pm2 save
    pm2 startup systemd -u root --hp /root

    echo "✅ StackScript complete: demo store and attacker server are running."
  EOT
}