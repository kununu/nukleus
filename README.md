<h1 style="text-align: center;">
    nukleus
</h1>
<hr />

Welcome to [kununu's](https://wwww.kununu.com) collection of [React](https://facebook.github.io/react/) UI components! These reusable components are designed and implemented to help build amazing products fast and easily.

[![Greenkeeper badge](https://badges.greenkeeper.io/kununu/nukleus.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/kununu/nukleus.svg?branch=master)](https://travis-ci.org/kununu/nukleus) [![Dependencies](https://david-dm.org/kununu/nukleus/master/status.svg)](https://david-dm.org/kununu/nukleus/master)
[![Dev dependencies](https://david-dm.org/kununu/nukleus/master/dev-status.svg)](https://david-dm.org/kununu/nukleus/master)
[![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://kununu.github.io/nukleus)

## Features
* Over 80% code coverage
* Frequently updated
* Wide range of form and UI components

<br />

## Setup
<hr/>

### Install with `npm` or `yarn`
```sh
npm i nukleus
# OR
yarn add nukleus
```

<br />

### Usage

You will need a module bundler that supports css modules. To do this with [webpack](https://webpack.js.org/) (recommended) you can use something like this:

```javascript
{
    test: /\.css$/,
    include: /nukleus/,
    use: [
      'style-loader',
      'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]',
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer')
            ];
          }
        }
      },
    ]
  }
```

Next you can import each compiled nukelus component seperately, which will help reduce your bundle size if you only require a few components.
```javascript
import Select from 'nukleus/dist/components/Select';
import TextField from 'nukleus/dist/components/TextField';
```

Or you can import and bundle all nukleus components via:
```javascript
import {Select, TextField} from 'nukleus';
```

<br />

## Contributing
<hr />
Coming soon 🎉

<br />

## Test
<hr />
In order to run the tests, run `npm run test`.

There could be two reasons why the tests are failing: either your component broke or was modified on purpose.
In the latter case, you will just need to update the snapshot as we use jest snapshot testing.
