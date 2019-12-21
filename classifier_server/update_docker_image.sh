#!/usr/bin/env bash
if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root" 
  exit 1
fi
yarn
docker build -t extint_classifier .
docker stop extint_classifier || true
docker rm extint_classifier || true
docker run -p 3002:3002 -d --name extint_classifier extint_classifier