#!/bin/bash
mkdir -p ~/.tanmay/lily58
wget https://raw.githubusercontent.com/tanmayv/lily58-host/main/index.js -P ~/.tanmay/lily58
pushd ~/.tanmay/lily58
npm i -g pm2
pm2 start index.js
pm2 startup
popd
