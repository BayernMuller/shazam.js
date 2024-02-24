#!/bin/bash

ROOT="$(pwd)"

if [ -L .git/hooks/post-checkout ]; then
  unlink .git/hooks/post-checkout
fi

ln -s "$ROOT/build-wasm.sh" .git/hooks/post-checkout