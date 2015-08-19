#!/bin/sh
set -e
set -u

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
    shasum -a 256 $1 2>/dev/null | awk '{ print $1 }'
  fi
}

key_from_conf()
{
  cat scripts/config.js | grep $1 | sed -e "s/^ *\"$1\" *: *//" -e 's/[", ]//g'
}

cat index.html.template | \
sed \
-e "s/{{build_date}}/$(date)/g" \
-e "s/{{js_signature}}/$(file_signature dist/aris.js)/g" \
-e "s/{{css_signature}}/$(file_signature styles/arisjs.css)/g" \
-e "s/{{google_analytics}}/$(key_from_conf google_analytics_key)/g" \
-e "s/{{google_maps}}/$(key_from_conf google_maps_key)/g" \
> tmp_index.html

if [ "`key_from_conf compress`" = "true" ]; then
  cat tmp_index.html |
  sed \
  -e 's/{{compressed.}}//g' \
  -e 's/{{uncompressedo}}/<!--/' \
  -e 's/{{uncompressedc}}/-->/' \
  > index.html
else
  cat tmp_index.html |
  sed \
  -e 's/{{uncompressed.}}//g' \
  -e 's/{{compressedo}}/<!--/' \
  -e 's/{{compressedc}}/-->/' \
  > index.html
fi

rm tmp_index.html

