ssh $1 "cd /var/www/html/editor/ && git checkout build && git pull"
scp dist/aris.js* ${1}:/var/www/html/editor/dist/
scp styles/arisjs.css ${1}:/var/www/html/editor/styles/
scp index.html ${1}:/var/www/html/editor/
