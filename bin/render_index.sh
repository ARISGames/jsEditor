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
    shasum -a 256 $1 2>/dev/null | awk '{ print $1 }'
  fi
}

key_from_conf()
{
  cat scripts/config.js | grep $1 | sed -e "s/^ *\"$1\" *: *//" -e 's/[", ]//g'
}

cat index.html.template | \
sed \
-e "s/{{build_date}}/$(date)/" \
-e "s/{{js_signature}}/$(file_signature dist/aris.js)/" \
-e "s/{{css_signature}}/$(file_signature styles/arisjs.css)/" \
-e "s/{{google_analytics}}/$(key_from_conf google_analytics_key)/" \
> tmp_index.html

if [[ `key_from_conf compress` = true ]]; then
  echo "hello?"
  cat tmp_index.html |
  sed \
  -e 's/{{compressed.}}//g' \
  -e 's/{{uncompressedo}}/<!--/' \
  -e 's/{{uncompressedc}}/-->/' \
  > index.html
else
  echo "there?"
  cat tmp_index.html |
  sed \
  -e 's/{{uncompressed.}}//g' \
  -e 's/{{compressedo}}/<!--/' \
  -e 's/{{compressedc}}/-->/' \
  > index.html
fi

rm tmp_index.html

