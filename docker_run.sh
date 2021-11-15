#!/bin/bash

docker build -t khc/networkcuck . && docker run --env-file .env --name networkcuck -d khc/networkcuck
