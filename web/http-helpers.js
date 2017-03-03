var path = require('path');
var fs = require('fs');
var url = require('url');

var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


exports.writeWebPage = function(req, res, path, statusCode) {
  var statusCode = statusCode || 200;
  fs.readFile(path, function(err, html) {
    if (err) {
      throw err;
    }
    res.writeHeader(statusCode, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
  });
};

exports.sendResponse = function(response, obj, statusCode) {
  statusCode = statusCode || 200;
  response.writeHeader(statusCode, exports.headers);
  response.end(obj);
};

exports.sendRedirect = function(response, location, statusCode) {
  statusCode = statusCode || 302;
  response.writeHeader(statusCode, {location: location});
  response.end();
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
  'GET': function(request, response) {
    var urlPath = url.parse(request.url).pathname;
    if (urlPath === '/') {
      urlPath = '/index.html';
    }
    exports.serveAssets(response, urlPath, function() {
      if (urlPath[0] === '/') {
        urlPath = urlPath.slice(1);
      }
      archive.isUrlInList(urlPath, function(found) {
        if (found) {
          exports.sendRedirect(response, '/loading.html');
        } else {
          exports.sendResponse(response, '404 file not found', 404);
        }

      });
    });
    // archive.isUrlInList(route, function(boolean) {
    //   if (boolean) {
    //     // var archivedSite = path.join(__dirname, '../archives/sites' + '/' + route);
    //     var archivedSite = '/Users/student/Desktop/hrsf73-web-historian/test/testdata/sites/' + route;
    //     exports.writeWebPage(req, res, archivedSite);
    //   } else {
    //     console.log(archive.paths.index);
    //     exports.writeWebPage(req, res, archive.paths.index, 302);
    //   }
    // });

  }
};


  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
exports.serveAssets = function(res, asset, callback) {
  fs.readFile( archive.paths.siteAssets + asset, 'utf8', function(err, data) {
    if (err) {
      fs.readFile( archive.paths.archivedSites + asset, 'utf8', function(err, data) {
        if (err) {
          callback ? callback() : exports.sendResponse(res, '404 file not found', 404);
        } else {
          exports.sendResponse(res, data);
        }
      });
    } else {
      exports.sendResponse(res, data);
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!












