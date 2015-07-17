ssh ${1} "cd /var/www/html/editor/ && git checkout build && git pull && make build"
