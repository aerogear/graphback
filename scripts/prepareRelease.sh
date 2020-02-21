#!/bin/bash
echo "Preparing release"

set -e

npm install	
npm run bootstrap	
npm run build

# don't run in CI
if [ ! "$CI" = true ]; then
  lerna publish --skip-git --force-publish=* --skip-npm
fi

echo "Repository is ready for release."

