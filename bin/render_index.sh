#!/bin/sh

cat index.html.template |\
	sed "s/{{build_date}}/$(date)/g" |\
	sed "s/{{js_signature}}/$(md5sum dist/aris.js | awk '{ print $1 }')/g" |\
	sed "s/{{css_signature}}/$(md5sum styles/arisjs.css | awk '{ print $1 }')/g" \
	> index.html
