# Makefile for the ARIS Javascript Editor
#
# Takes care of pulling code into build branch, combining all JS into one, and timestamping the index to avoid browser caches for changed files, and deploying.
#
# Some output is supressed, just remove the @ or dev/null redirects if troubleshooting.
#
OK_COLOR=\033[0;32m
INFO_COLOR=\033[1;36m
CLEAR=\033[m\017

arisprod1="root@neo.arisgames.org"
arisprod2="root@trinity.arisgames.org"
arisprod3="root@morpheus.arisgames.org"

help:
	@echo "Aris Javascript Editor"
	@echo ""
	@echo "Targets:"
	@echo "    css: compile less"
	@echo "     js: optimize all js into one file with requireJS"
	@echo "   html: add timestamps and signatures to index"
	@echo "  build: css js html"
	@echo ""
	@echo " deploy: push build branch to production"
	@echo ""
	@echo "make [build|deploy]"

css:
	@echo "Compiling LESS into CSS."
	@lessc styles/arisjs.less > styles/arisjs.css
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"

js:
	@echo "Builing application into dist/aris.js."
	@r.js -o build.js >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"

html:
	@echo "Rendering template into index.html."
	@bin/render_index.sh >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"

dev:
	@echo "Pushing to Github."
	@git push >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to dev."
	@ssh -t aris-dev "cd /var/www/html/editor2/ && sudo git checkout master && sudo git pull"

prod:
	@echo "Merging build."
	@git checkout build
	@git merge master
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Pushing to Github."
	@git push >/dev/null
	@git checkout master;
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 1."
	@ssh $(arisprod1) "cd /var/www/html/editor/ && git checkout build && git pull && make build" >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 2."
	@ssh $(arisprod2) "cd /var/www/html/editor/ && git checkout build && git pull && make build" >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 3."
	@ssh $(arisprod3) "cd /var/www/html/editor/ && git checkout build && git pull && make build" >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"

build: css js html

deploy: prod

