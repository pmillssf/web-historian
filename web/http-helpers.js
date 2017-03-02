var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


exports.writeResponse = function(res, statusCode, data) {
  var statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(data);
};

exports.collectUrl = function(req, callback) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });

  req.on('end', function() {
    callback(data);
  });
};

exports.actions = {
  'GET': function(req, res) {
    // check if url already in list
    if (isUrlInList) {
      // 
      
    }
  }
};


  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
exports.serveAssets = function(res, asset, callback) {


};



// As you progress, keep thinking about what helper functions you can put here!
