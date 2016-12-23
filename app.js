var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var express = require('express')
var timeout = require('connect-timeout')




var Promise = require('bluebird');
var util = require('util');
var fs = require('fs');
var request = require('request');
var fs = require('fs');


var download = function(url){
  return Promise.promisify(function (done) {
    request(url).pipe(fs.createWriteStream("hello.mp4")).on( 'error', function(err) {
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
app.use(timeout('15m'))
app.use(bodyParser())
app.use(haltOnTimedout)
app.use(cookieParser())
app.use(haltOnTimedout)

// Add your routes here, etc.



app.post('/save', function (req, res, next) {
 
   req.setTimeout(0);
    var url = 'https://dl.dropboxusercontent.com/u/5463008/to%20delete/2016-11-18%2017.56%20UI%20development%20discussion.mp4';
  
    download(url).then( function(result){
      res.json({status:200});

    }).catch( function(err){
      res.json({status:400});

    });
 
});

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

app.listen(3000)