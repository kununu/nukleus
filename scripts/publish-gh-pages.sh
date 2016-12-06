#!/usr/bin/env bash

cd docs
npm prune
npm install --ignore-scripts
npm run clean
npm run build

cd ..
git add .
git commit -m 'Build docs' --no-verify
git push
