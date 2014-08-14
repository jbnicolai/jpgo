# [jpgo](https://npmjs.org/package/jpgo)

## About

Optimize JPG images.

[![Build Status](https://travis-ci.org/1000ch/jpgo.svg?branch=master)](https://travis-ci.org/1000ch/jpgo)
[![NPM version](https://badge.fury.io/js/jpgo.svg)](http://badge.fury.io/js/jpgo)
[![Dependency Status](https://david-dm.org/1000ch/jpgo.svg)](https://david-dm.org/1000ch/jpgo)
[![devDependency Status](https://david-dm.org/1000ch/jpgo/dev-status.svg)](https://david-dm.org/1000ch/jpgo#info=devDependencies)

## Usage

### as Node.js module

```js
var JPGO = require('jpgo');
var jpgo = new JPGO('target.jpg');
jpgo.optimize(functoion (error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});
```

### Command line

```sh
$ jpgo target.jpg
```

## License

MIT