#!/bin/bash

docker run --restart always -p 84:8080 -d --name koalas-frontend koalas-frontend:v1
