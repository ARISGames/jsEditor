#!/bin/sh

# Helper for conditional inclusion of features.
function command_exists() {
	type "$1" &> /dev/null ;
}

file_signature() {
	if command_exists sha256
	then
		sha256sum $1 | awk '{ print $1 }'
	else
		shasum -a 256 $1 | awk '{ print $1 }'
	fi
}

tracker_snippet() {
	cat scripts/tracker.production.js
}

cat index.html.template |\
	sed "s/{{build_date}}/$(date)/g" |\
	sed "s/{{js_signature}}/$(file_signature dist/aris.js)/g" |\
	sed "s/{{css_signature}}/$(file_signature styles/arisjs.css)/g" \
	sed "s/{{google_analytics}}/$(tracker_snippet)/g" \
	> index.html
