#!/bin/bash
echo "Preparing release"

set -e

# don't run in CI
if [ ! "$CI" = true ]; then
  lerna publish --skip-git --force-publish=* --skip-npm
fi

echo "Repository is ready for release."

