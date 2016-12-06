# nukleus

[![Build Status](https://travis-ci.org/kununu/nukleus.svg?branch=master)](https://travis-ci.org/kununu/nukleus)

## kununu's shared ui components

### Install and run

```bash
npm install --ignore-scripts
npm start
```
Open [http://localhost:3000/playground](http://localhost:3000/playground).

The `--ignore-scripts` argument is given since we are running a `prepublish` script we just wish to run before publishing and not after installing. You can read more here https://github.com/npm/npm/issues/3059

If you omit the argument, the installation will go through but you'll receive and error related to the `prepublish` script that (as intented) exits with status 1.

As for npm@5, this behaviour should change so we can get rid of the `in-publish` package.

### Test

In order to run the tests, run `npm run test`.

There could be two reasons why the tests are failing: either your component broke or was modified on purpose.
In the latter case, you will just need to update the snapshot.

## Publish a new version

In order to update the npm version we must create and push a new tag. Pushing a new tag will cause Travis to automatically publish the new npm version ([docs](https://docs.travis-ci.com/user/deployment/npm)).

```bash
# Do the following on the master branch
git tag -a vX.Y.Z -m "<what changed in this version>"
git push --tags
```
