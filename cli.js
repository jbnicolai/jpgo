#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var async = require('async');
var glob = require('glob');
var minimist = require('minimist');
var chalk = require('chalk');
var filesize = require('filesize');
var JPGO = require('./');

var argv = minimist(process.argv.slice(2));

var jpgs = [];

argv._.filter(function (arg) {
  return fs.existsSync(arg);
}).forEach(function (arg) {
  if (fs.statSync(arg).isFile()) {
    jpgs.push(path.resolve(arg));
  } else if (fs.statSync(arg).isDirectory()) {
    fs.readdirSync(arg).forEach(function(file) {
      jpgs.push(path.resolve(path.join(arg, file)));
    });
  } else {
    glob(arg, function (error, files) {
      if (error) {
        throw error;
      }
      files.forEach(function (file) {
        jpgs.push(path.resolve(file));
      });
    });
  }
});

jpgs = jpgs.filter(function (jpg) {
  return path.extname(jpg).toLowerCase() === '.jpg';
});

async.eachLimit(jpgs, 10, function iterator(jpg) {
  new JPGO(jpg).optimize(function (error, data) {
    console.log(
      chalk.green('✔ ') + jpg,
      chalk.gray(' before=') + chalk.yellow(filesize(data.beforeSize)),
      chalk.gray(' after=') + chalk.cyan(filesize(data.afterSize)),
      chalk.gray(' reduced=') + chalk.green.underline(filesize(data.beforeSize - data.afterSize))
    );
  });
});