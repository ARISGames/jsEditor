OK_COLOR=\033[0;32m
INFO_COLOR=\033[1;36m
CLEAR=\033[m\017

host="fieldday-deploy@fieldday-web.ad.education.wisc.edu"
repo="/var/www/arisgames.org/editor"

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
	@echo "Building application into dist/aris.js."
	@r.js -o build.js
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"

html:
	@echo "Rendering template into index.html."
	@bin/render_index.sh >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"

prod_make_deploy:
	@echo "Merging build."
	@git checkout build >/dev/null
	@git merge master >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Pushing to Github."
	@git push >/dev/null
	@git checkout master >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server."
	@ssh $(host) "cd $(repo) && git checkout master && git pull && make build" > /dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"

# note- this needs to be updated to explicitly scp any essential files
# for this reason, 'make prod' is a more simple, elegant, and robust deploy script
# however, local precompilation is faster/ less resource intensive for hosts
# the config hacks allow utilization of config local to production,
# while maintaining unique local config
hack_config:
	@echo "Fetching remote config."
	@cp ./scripts/config.js ./scripts/config.js.local >/dev/null
	@scp $(host):$(repo)/scripts/config.js ./scripts/config.js >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
unhack_config:
	@echo "Restoring local config.."
	@mv ./scripts/config.js.local ./scripts/config.js >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"

prod_precompile_deploy: hack_config build unhack_config #hack->build->unhack order is intentional
	@echo "Merging build."
	@git checkout build >/dev/null
	@git merge master >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Pushing to Github."
	@git push >/dev/null
	@git checkout master >/dev/null
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"
	@echo "Deploying to server."
	@ssh $(host) "cd $(repo) && git checkout master && git pull"
	@scp dist/aris.js* $(host):$(repo)/dist/
	@scp styles/arisjs.css $(host):$(repo)/styles/
	@scp index.html $(host):$(repo)
	@echo "   $(OK_COLOR)(Done)$(CLEAR)"

build: css js html
build_prod: hack_config build unhack_config

prod: prod_precompile_deploy #switch to just 'prod_make_deploy' if you want a simpler, less volatile (but slower) deploy

