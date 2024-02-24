#!/bin/bash

ROOT="$(pwd)"
SRC="$ROOT/src"
VIBRA="$ROOT/vibra/wasm"

function error() {
  echo "Error: $1" 1>&2
  exit 1
}

# change to the directory of the script
cd "$VIBRA" || error "vibra directory not found"

# make clean
make -f Makefile.wasm clean || error "make clean failed"

# build the wasm module with emscripten
emmake make -f Makefile.wasm -I"$FFTW3_PATH/include" || error "wasm module build failed"

# change back to the root directory
cd "$ROOT" || error "root directory not found"

# copy the wasm module to the public directory
cp "$VIBRA/build/vibra.wasm" "$SRC" || error "wasm module not found"
cp "$VIBRA/build/vibra.js" "$SRC" || error "wasm module not found"

echo "Build complete"
exit 0