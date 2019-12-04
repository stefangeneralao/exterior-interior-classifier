#!/bin/sh
yarn build
docker build -t extint_client .
rm -rf build
docker stop extint_client || true
docker rm extint_client || true
docker run -p 3000:3000 -d --name extint_client extint_client
