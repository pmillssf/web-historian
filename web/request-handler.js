// require more modules/folders here!
var path = require('path');
var fs = require('fs');
var url = require('url');

var httpHelpers = require('../web/http-helpers');
var archive = require('../helpers/archive-helpers');


exports.handleRequest = function (req, res) {
  var method = req.method;

  if (httpHelpers.actions[method]) {
    httpHelpers.actions[method](req, res);
  }  
};
