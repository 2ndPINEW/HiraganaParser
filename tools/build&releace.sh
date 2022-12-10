

if [ $# -ne 1 ]; then
  echo "引数が必要です: patch | minor | major" 1>&2
  exit 1
fi

yarn build
npm version $1
git push
git push origin --tags
npm publish ./
yarn bundle:esm
# upload to cloudflare r2
yarn wrangler r2 object put packages/hiragana-parser/index.min.js --file ./lib/bundle/index.min.js
git checkout master
git merge develop
git push
git checkout develop