help:
	@echo "Aris Javascript Editor"
	@echo ""
	@echo "Targets:"
	@echo "   css: compile less"
	@echo " build: optimize all js into one file with requireJS"
	@echo ""
	@echo "make [all|css|build]"

css:
	lessc styles/arisjs.less > styles/arisjs.css

build:
	r.js -o build.js
	@echo "Built! Make sure to check the result into the build branch, not master"

all: css build
