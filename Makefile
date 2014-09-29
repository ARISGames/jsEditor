# Makefile for the ARIS Javascript Editor
#
# Takes care of pulling code into build branch, combining all JS into one, and timestamping the index to avoid browser caches for changed files, and deploying.
#
# Some output is supressed, just remove the @ or dev/null redirects if troubleshooting.

help:
	@echo "Aris Javascript Editor"
	@echo ""
	@echo "Targets:"
	@echo " rebase: force rebase over build branch"
	@echo "    css: compile less"
	@echo "  build: optimize all js into one file with requireJS"
	@echo "    all: rebase compile optimize"
	@echo " heroku: push build branch to heroku"
	@echo " deploy: push build branch to aris"
	@echo ""
	@echo "make [all|css|build|deploy]"

css:
	@echo "Compiling LESS into CSS."
	@lessc styles/arisjs.less > styles/arisjs.css
	@echo "   (Done)"

build:
	@echo "Builing application into dist/aris.js."
	@r.js -o build.js 1>/dev/null
	@echo "   (Done)"

heroku:
	git push -f heroku build:master

deploy:
	@echo "Pushing to Github."
	@git push -f 1>/dev/null
	@echo "   (Done)"
	@echo "Deploying to server."
	@ssh aris "cd /var/www/html/jseditor/ && git checkout build && git fetch && git rebase -f origin/build" 1>/dev/null
	@echo "   (Done)"

render:
	@echo "Rendering template into index.html."
	@bin/render_index.sh
	@echo "   (Done)"

rebase:
	@echo "Rebasing master onto build branch."
	@git rebase -f master
	@echo "   (Done)"

note:
	@echo ""
	@echo "--- Now commit to the build branch and make deploy! ---"
	@echo ""

all: rebase css build render note
