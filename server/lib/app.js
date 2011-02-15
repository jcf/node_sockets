(function() {
  var URLS, formatted_response, http, io, server, socket, sys, util;
  sys = require('sys');
  util = require('util');
  http = require('http');
  io = require('socket.io');
  server = http.createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return res.end('<h1>Hello world</h1>');
  });
  server.listen(3000);
  socket = io.listen(server);
  URLS = {
    'video': 'http://youtube.com',
    'text': 'http://twitter.com',
    'image': 'http://flickr.com'
  };
  formatted_response = function(connection, message) {
    var json;
    json = JSON.parse(message);
    return JSON.stringify({
      remoteAddress: connection.remoteAddress,
      remotePort: connection.remotePort,
      message: json['message'],
      url: URLS[json['type']]
    });
  };
  socket.on('connection', function(client) {
    client.on('message', function(message) {
      var reply;
      reply = formatted_response(client.request.connection, message);
      util.log(reply);
      return client.send(reply);
    });
    return client.on('disconnect', function() {});
  });
}).call(this);
