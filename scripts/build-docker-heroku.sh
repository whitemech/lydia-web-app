#!/usr/bin/env bash

REACT_APP_API_ENDPOINT="/api/"
REACT_APP_API_HOSTNAME="lydia.whitemech.it"

docker build \
  --build-arg REACT_APP_API_ENDPOINT="${REACT_APP_API_ENDPOINT}" \
  --build-arg REACT_APP_API_HOSTNAME="${REACT_APP_API_HOSTNAME}" \
  -t lydia-web-app .
