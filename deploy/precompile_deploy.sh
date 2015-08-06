PRODEDITOR=/var/www/html/editor/
BETAEDITOR=/var/www/html/beta-editor/

PRODBRANCH=build
BETABRANCH=master

if [ $# -gt 1 ] && [ "$2" == "--beta" ]; then
  EDITOR=$BETAEDITOR
  BRANCH=$BETABRANCH
else
  EDITOR=$PRODEDITOR
  BRANCH=$PRODBRANCH
fi

ssh $1 "cd $EDITOR && git checkout $BRANCH && git pull"
scp dist/aris.js* $1:$EDITOR/dist/
scp styles/arisjs.css $1:$EDITOR/styles/
scp index.html $1:$EDITOR

