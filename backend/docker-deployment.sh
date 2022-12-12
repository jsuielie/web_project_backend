#! /usr/bin/bash


cd ../frontend
# set environment variable NODE_ENV to "prod"
# build webpack on production mode, with process.env.NODE_ENV within webpack.config.js as "production" and env.environment within webpack.config.json as docker
npx webpack build --config ./webpack.config.js --mode production --node-env production --env environment=docker
cp -ru dist ../backend/

cd ../backend

export DOCKER_REGISTRY="public.ecr.aws/e8u7j0e0"
export APP_NAME="web_app"
export APP_VERSION=$1

docker login --username AWS --password $2 $DOCKER_REGISTRY

docker build -t $DOCKER_REGISTRY/$APP_NAME:$APP_VERSION -t $DOCKER_REGISTRY/$APP_NAME:latest .
docker push $DOCKER_REGISTRY/$APP_NAME:$APP_VERSION
docker push $DOCKER_REGISTRY/$APP_NAME:latest
