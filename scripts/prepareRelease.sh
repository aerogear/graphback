#!/bin/bash
echo "Preparing release"

set -e

yarn	
yarn build

# don't run in CI
if [ ! "$CI" = true ]; then
  yarn lerna publish --skip-git --force-publish=* --skip-npm --exact
fi

echo "Repository is ready for release."

