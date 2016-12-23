var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var express = require('express')
var timeout = require('connect-timeout')
var Promise = require('bluebird');
var util = require('util');
var fs = require('fs');
var request = require('request');
var fs = require('fs');


var download = function(){
  var agent = new require('http').Agent({ keepAlive: true })
    var firstReq = {
      url:'http://f9.stream.nixcdn.com/ad0ddeed0d46e43f9a6861a9648f69ae/585cf314/SongClip31/NhaLaDeTroTap8TinhNgayLyGian-VA-4709586.mp4',
      agent: agent
    }
  return Promise.promisify(function (done) {
    request(firstReq).pipe(fs.createWriteStream("hello.mp4")).on( 'error', function(err) {
      console.log('download video with error:%s', err);
      done(null, "hung");
    }).on('close', function(){
      console.log('download close');
      done(null, "nguyen");
    });
  })();
};

// example of using this top-level; note the use of haltOnTimedout
// after every middleware; it will stop the request flow on a timeout
var app = express()
app.use(bodyParser())

app.use(cookieParser())

// Add your routes here, etc.
app.post('/save', function (req, res, next) {

   req.setTimeout(0);
    download().then( function(result){
      res.json({status:200});

    }).catch( function(err){
      console.log('err:%s', err);
      res.json({status:err});
    });
});

app.listen(3000)
