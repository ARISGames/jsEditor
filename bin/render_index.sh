#!/bin/sh

# Helper for conditional inclusion of features.
command_exists()
{
  type "$1" &> /dev/null ;
}

file_signature()
{
  if which sha256sum > /dev/null; then
    sha256sum $1 | awk '{ print $1 }'
  else
    shasum -a 256 $1 | awk '{ print $1 }'
  fi
}

tracker_snippet()
{
  cat scripts/tracker.js
}

cat index.html.template | \
sed \
-e "s/{{build_date}}/$(date)/" \
-e "s/{{js_signature}}/$(file_signature dist/aris.js)/" \
-e "s/{{css_signature}}/$(file_signature styles/arisjs.css)/" \
-e "s/{{google_analytics}}/$(tracker_snippet)/" \
> index.html

