#!/bin/bash
echo "Preparing release"

set -e

yarn	
yarn build

# don't run in CI
if [ ! "$CI" = true ]; then
  yarn lerna publish --skip-git --force-publish=* --skip-npm --exact
fi

if [[ -z "${GITHUB_AUTH}" ]]; then
  echo "\033[0;33mWarning: GitHub Token not set for lerna-changelog package. See https://github.com/lerna/lerna-changelog#github-token\033[0m"
fi

# print CHANGELOG from PRs
yarn lerna-changelog

echo "Latest changelog has been printed to your console"

echo "Repository is ready for release."

