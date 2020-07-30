#!/bin/bash

# get names of packages being managed by lerna
PACKAGES=$(lerna --loglevel=silent ls | awk -F ' ' '{print $1}')

# generate docs for each package
for package in $PACKAGES; do
  echo $package
  # Ignore the "graphback/runtime" package since it is deprecated
  # Remove this line once https://github.com/aerogear/graphback/issues/1768 is resolved
  if [ "@graphback/runtime" == "$package" ]; then
    continue
  # graphback appears in many of our package hence searching using that pattern will show duplicates results
  # so let's handle the "graphback" package differently from the rest of our packages
  elif [ "graphback" == "$package" ]; then
    outputDirName=$package
    inputDirName="packages/graphback"
  else
    inputDirName=$(lerna --loglevel=silent ls -l | grep $package | awk -F ' ' '{print $3}' | cut -c1-)
    outputDirName=$(lerna --loglevel=silent ls -l | grep $package | awk -F ' ' '{print $3}' | cut -c10-)
  fi

  yarn typedoc --excludeNotExported --plugin typedoc-plugin-markdown --skipSidebar --hideBreadcrumbs --theme docusaurus2 --ignoreCompilerErrors --out docs/api/${outputDirName} --inputFiles ${inputDirName}/src
  echo "API documentation generated for ${package}"
done
