# nukleus

[![Build Status](https://travis-ci.org/kununu/nukleus.svg?branch=master)](https://travis-ci.org/kununu/nukleus)
[![Dependencies](https://david-dm.org/kununu/nukleus/master/status.svg)](https://david-dm.org/kununu/nukleus/master)
[![Dev dependencies](https://david-dm.org/kununu/nukleus/master/dev-status.svg)](https://david-dm.org/kununu/nukleus/master)

> React UI components by [@kununu](https://github.com/kununu)

## [Documentation](https://kununu.github.io/nukleus)

A collection of React user interface components.

Components include:

- Autocomplete
- CheckboxGroup
- Combobox
- DatePicker
- InfoText
- Logo
- Notification
- Paginator
- Select
- Stars
- Table
- Tabs
- TextField

Get it from npm:

```bash
npm i nukleus --save
```

You can include nukleus in two ways. Either way, you'll need a module bundler that supports css modules (webpack is recommended).

You can include all compiled components and the main css (once) this way.

```javascript
import {Logo, Select} from 'nukleus';
import 'nukleus/dist/main.css';
```

Alternatively, you can use the source files. This has the benefit of making your final bundle smaller, but you will need to install a compatible sass version in your hosting app.

```javascript
import Logo from 'nukleus/components/Logo/index.jsx';
import Select from 'nukleus/components/Select/index.jsx';
import 'nukleus/dist/main.css'
```

## Development

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

### Publish a new version

In order to update the npm version we must create and push a new tag and run the publish command. This will work given you have the right credentials.

```bash
# Do the following on the master branch
git tag -a vX.Y.Z -m "<what changed in this version>"
git push --tags
npm publish
```

### Publish a new version (UPCOMING)

 Pushing a new tag will cause Travis to automatically publish the new npm version ([docs](https://docs.travis-ci.com/user/deployment/npm)).
