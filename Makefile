help:
	@echo "Aris Javascript Editor"
	@echo ""
	@echo "Targets:"
	@echo "    css: compile less"
	@echo "  build: optimize all js into one file with requireJS"
	@echo "    all: compile/optimize but no deploy"
	@echo " deploy: push build branch to heroku"
	@echo ""
	@echo "make [all|css|build|deploy]"

css:
	lessc styles/arisjs.less > styles/arisjs.css

build:
	r.js -o build.js
	@echo "Built! Make sure to check the result into the build branch, not master"

deploy:
	git push -f heroku build:master

all: css build
