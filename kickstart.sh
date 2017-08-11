#!/bin/bash

docker rm -f $(docker ps -a -q)

docker build -t javascript-tdd-environment .

docker run --name js-tdd2 -d -p 8080:8080 -p 22:22 -v "$PWD:/myproject" javascript-tdd-environment

