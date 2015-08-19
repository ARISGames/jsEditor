# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.network :forwarded_port, guest: 80, host: 10180

  # set a different SSH port so as not to conflict with the server repo
  config.vm.network :forwarded_port, guest: 22, host: 2322, id: "ssh"
  config.ssh.port = 2322

  config.vm.provision 'shell', inline: <<-SHELL
    apt-get update
    apt-get install -y nginx build-essential npm
    # the following line makes node.js available at "node", instead of just "nodejs"
    update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10
    npm install -g less requirejs
    rm -rf /usr/share/nginx/html
    ln -fs /vagrant /usr/share/nginx/html
  SHELL

  config.vm.provision 'shell', privileged: false, inline: <<-SHELL
    cd /vagrant
    cp scripts/config.js.vagrant scripts/config.js
    make build
    echo "Your ARIS editor is ready!"
  SHELL
end
