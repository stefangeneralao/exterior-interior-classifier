#!/usr/bin/env bash
if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root" 
  exit 1
fi
yarn
docker build -t extint_api .
docker stop extint_api || true
docker rm extint_api || true
docker run -p 3001:3001 -d --name extint_api extint_api