#!/bin/bash

cp .git dist/ng-rocketparts/ -r
cp README.md dist/ng-rocketparts/
cd dist/ng-rocketparts/
npm install
npx semantic-release
