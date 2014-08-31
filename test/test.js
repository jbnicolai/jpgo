var assert = require('assert');
var path = require('path');
var fs = require('fs');
var rm = require('rimraf');
var JPGO = require('../');

describe('jpgo', function () {

  afterEach(function (callback) {
    rm(path.join(__dirname, 'tmp'), callback);
  });

  beforeEach(function () {
    fs.mkdirSync(path.join(__dirname, 'tmp'));
  });

  it('should minify a JPG', function (callback) {

    var before = path.join(__dirname, 'fixtures/test.jpg');
    var after = path.join(__dirname, 'tmp/test.jpg');
    fs.writeFileSync(after, fs.readFileSync(before));

    new JPGO(after).optimize(function (error, data) {
      
      assert(!error);
      assert(data.beforeSize > data.afterSize);
      
      callback();
    });
  });

  it('should minify a JPG (upper case file)', function (callback) {

    var before = path.join(__dirname, 'fixtures/test-uppercase.JPG');
    var after = path.join(__dirname, 'tmp/test-uppercase.JPG');
    fs.writeFileSync(after, fs.readFileSync(before));

    new JPGO(after).optimize(function (error, data) {

      assert(!error);
      assert(data.beforeSize > data.afterSize);

      callback();
    });
  });
});