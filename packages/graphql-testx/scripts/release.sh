#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

__script="${0}"

help() {
    echo >&2 "USAGE: ${__script} [options] TAG"
    echo >&2
    echo >&2 "  TAG         The tag to validate before releasing or"
    echo >&2 "               'dev' to automatically release a dev version"
    echo >&2
    echo >&2 "Options:"
    echo >&2 "  --help"
}

package_version() {
    jq -r '.version' package.json
}

TAG=""
RELEASE=""
while [[ $# -gt 0 ]]; do
    case "${1}" in
    --help)
        help
        exit 0
        ;;
    --release)
        RELEASE="true"
        shift
        ;;
    *)
        TAG="${1}"
        shift
        break # all options should be before the TAG
        ;;
    esac
done

if [ -z "${TAG}" ]; then
    echo >&2 "error: TAG is undefined"
    echo >&2
    help
    exit 1
fi

# get version found in package.json. This is the source of truth
PACKAGE_VERSION="$()"

# Prepare a dev release
if [ "${TAG}" = "dev" ]; then
    echo >&2 "info: preparing dev version"

    commits_count="$(git rev-list HEAD --count)"
    last_commit_hash="$(git rev-parse --short HEAD)"

    current_version="$(package_version)"

    # remove from the current version everything after -
    current_version="${current_version%%-*}"

    # create the new version
    TAG="${current_version}-dev${commits_count}.${last_commit_hash}"

    # write the new version to the package json
    tmp="$(mktemp)"
    jq --arg v "${TAG}" '.version = $v' package.json >"${tmp}"
    cat "${tmp}" >package.json
fi

# validate that TAG == version found in package.json
if [[ "$TAG" != "$(package_version)" ]]; then
    echo >&2 "error: the tag $TAG is not the same as package version found in package.json $PACKAGE_VERSION"
    exit 1
fi

if [ "${RELEASE}" != "true" ]; then
    echo >&2 "warn: the package will not be pushed to npm"
    echo >&2 "  this work should be done by the CI"
    echo >&2 "  but if you really want to push npm you"
    echo >&2 "  should add --release option"
fi

if [[ "${TAG}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then

    echo >&2 "info: publishing a new release: $TAG"
    [ "$RELEASE" == "true" ] && npm publish

elif [[ "${TAG}" =~ ^[0-9]+\.[0-9]+\.[0-9]+-dev.+$ ]]; then

    echo >&2 "info: publishing a new dev release: $TAG"
    [ "$RELEASE" == "true" ] && npm publish --tag dev

elif [[ "${TAG}" =~ ^[0-9]+\.[0-9]+\.[0-9]+-.+$ ]]; then

    echo >&2 "info: publishing a new pre release: $TAG"
    [ "$RELEASE" == "true" ] && npm publish --tag next

else
    echo >&2 "error: the tag $TAG is not in one of the valid format"
    exit 1
fi
