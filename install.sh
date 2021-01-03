#!/bin/bash
mkdir -p ~/.tanmay/lily58
curl -o ~/.tanmay/lily58/index.js https://raw.githubusercontent.com/tanmayv/lily58-host/main/index.js
pushd ~/.tanmay/lily58
npm i -g pm2
pm2 start index.js
pm2 startup
popd
