#!/bin/bash

if [ "$NODE_ENV" = "production" ]
then
    echo "Production env detected"
    npm start
else
    echo "Non-production env detected"
    env $(cat .env | xargs) node_modules/.bin/concurrently "npm start" "cd client && npm start"
fi
