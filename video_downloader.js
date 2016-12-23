'use strict';

var Promise = require('bluebird');
var util = require('util');
var fs = require('fs');
var request = require('request');
var fs = require('fs');


var download = function(videoObject){
  return Promise.promisify(function (done) {
    request(videoObject.ex_source).pipe(fs.createWriteStream(videoObject.filename)).on( 'error', function(err) {
      log.error('download video object :%s with error:%s', JSON.stringify(videoObject), err);
      done(null, videoObject);
    }).on('close', function(){
      log.info('download close');
      done(null, videoObject);
    });
  })();
};
