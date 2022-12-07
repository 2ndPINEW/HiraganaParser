

if [ $# -ne 1 ]; then
  echo "引数が必要です: patch | minor | major" 1>&2
  exit 1
fi

yarn build
npm version $1
git push
git push origin --tags
npm publish ./