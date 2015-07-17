# Makefile for the ARIS Javascript Editor
#
# Takes care of pulling code into build branch, combining all JS into one, and timestamping the index to avoid browser caches for changed files, and deploying.
#
# Some output is supressed, just remove the @ or dev/null redirects if troubleshooting.
#
OK_COLOR=\033[0;32m
INFO_COLOR=\033[1;36m
CLEAR=\033[m\017

arisprod1=root@neo.arisgames.org
arisprod2=root@trinity.arisgames.org
arisprod3=root@morpheus.arisgames.org

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
	@git checkout build >/dev/null
	@git merge master >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Pushing to Github."
	@git push >/dev/null
	@git checkout master >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 1."
	@deploy/deploy.sh $(arisprod1) >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 2."
	@deploy/deploy.sh $(arisprod2) >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 3."
	@deploy/deploy.sh $(arisprod3) >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"

# note- this needs to be updated to explicitly scp any essential files
# for this reason, 'make prod' is a more simple, elegant, and robust deploy script
# however, local precompilation is faster/ less resource intensive for hosts
# the config hacks allow utilization of config local to production,
# while maintaining unique local config
hack_config:
	@echo "Fetching remote config."
	@cp ./scripts/config.js ./scripts/config.js.local >/dev/null
	@scp $(arisprod1):/var/www/html/editor/scripts/config.js ./scripts/config.js >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
unhack_config:
	@echo "Restoring local config.."
	@mv ./scripts/config.js.local ./scripts/config.js >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
prod_precompile: hack_config build unhack_config #hack->build->unhack order is intentional
	@echo "Merging build."
	@git checkout build >/dev/null
	@git merge master >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Pushing to Github."
	@git push >/dev/null
	@git checkout master >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 1."
	@deploy/precompile_deploy.sh $(arisprod1) >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 2."
	@deploy/precompile_deploy.sh $(arisprod2) >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server 3."
	@deploy/precompile_deploy.sh $(arisprod3) >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"

build: css js html

deploy: prod_precompile #switch to just 'prod' if you want a simpler, less volatile (but slower) deploy

