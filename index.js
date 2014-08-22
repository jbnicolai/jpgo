var fs = require('fs');
var execFile = require('child_process').execFile;
var async = require('async');

var jpegRecompress = require('jpeg-recompress-bin');
var jpegoptim = require('jpegoptim-bin');
var jpegtran = require('jpegtran-bin');
var mozjpeg = require('mozjpeg');

var JPGO = module.exports = function (target) {

  this.target = target;

  this.optimizers = [];
  this.optimizers.push({
    name: 'jpeg-recompress',
    path: jpegRecompress.path,
    args: [
      '--progressive',
      '--strip',
      '--quality medium',
      '--min 40',
      '--max 80',
      this.target,
      this.target
    ]
  });
  this.optimizers.push({
    name: 'jpegoptim',
    path: jpegoptim.path,
    args: [
      '--override',
      '--strip-all',
      '--strip-iptc',
      '--strip-icc',
      '--all-progressive',
      this.target
    ]
  });
  this.optimizers.push({
    name: 'jpegtran',
    path: jpegtran.path,
    args: [
      '-optimize',
      '-progressive',
      '-outfile' + this.target,
      this.target
    ]
  });
};

JPGO.prototype.optimize = function (callback) {

  var callback = callback || function () {};
  var target = this.target;
  var before = fs.statSync(target);
  
  var functions = this.optimizers.map(function (optimizer) {
    return function (callback) {
      execFile(optimizer.path, optimizer.args, function () {
        callback(null, optimizer.name);
      });
    };
  });

  async.series(functions, function (error, result) {
    callback(error, {
      before: before,
      after: fs.statSync(target)
    });
  });
};