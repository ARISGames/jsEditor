# Makefile for the ARIS Javascript Editor
#
# Takes care of pulling code into build branch, combining all JS into one, and timestamping the index to avoid browser caches for changed files, and deploying.
#
# Some output is supressed, just remove the @ or dev/null redirects if troubleshooting.
#
OK_COLOR=\033[0;32m
INFO_COLOR=\033[1;36m
CLEAR=\033[m\017

help:
	@echo "Aris Javascript Editor"
	@echo ""
	@echo "Targets:"
	@echo "  merge: merge master into build branch"
	@echo "    css: compile less"
	@echo "     js: optimize all js into one file with requireJS"
	@echo "   html: add timestamps and signatures to index"
	@echo "    all: merge css js html"
	@echo ""
	@echo "    dev: push master branch to development"
	@echo "   prod: push build branch to production"
	@echo ""
	@echo "make [merge|build|deploy]"

css:
	@echo "Compiling LESS into CSS."
	@lessc styles/arisjs.less > styles/arisjs.css
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"


js:
	@echo "Builing application into dist/aris.js."
	@r.js -o build.js
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"


html:
	@echo "Rendering template into index.html."
	@bin/render_index.sh
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"


dev:
	@echo "Pushing to Github."
	@git push 1>/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to dev."
	@ssh -t aris-dev "cd /var/www/html/editor2/ && sudo git checkout master && sudo git pull"


prod:
	@echo "Pushing to Github."
	@git push 1>/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 1."
	@ssh aris-prod1 "cd /var/www/html/editor/ && git checkout build && git pull" 1>/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 2."
	@ssh aris-prod2 "cd /var/www/html/editor/ && git checkout build && git pull" 1>/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 3."
	@ssh aris-prod3 "cd /var/www/html/editor/ && git checkout build && git pull" 1>/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"


merge:
	@echo "Merging master onto build branch."
	@git merge master
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"


note:
	@echo ""
	@echo "[$(INFO_COLOR)!$(CLEAR)] Now commit to the build branch and $(INFO_COLOR)make deploy$(CLEAR)!"
	@echo ""


build: css js html

deploy: prod

all: merge build note
