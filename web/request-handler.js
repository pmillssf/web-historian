var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var httpHelpers = require('../web/http-helpers');


exports.handleRequest = function (req, res) {
  var url = req.url;
  var method = req.method;


  fs.readFile(archive.paths.index, function(err, html) {
    if (err) {
      throw err;
    }
    res.writeHeader(200, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
  });

  // archive.paths.index
};
