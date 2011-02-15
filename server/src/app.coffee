sys = require('sys')
util = require('util')
http = require('http')
io = require('socket.io')

server = http.createServer((req, res) ->
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end '<h1>Hello world</h1>'
)

server.listen(3000)

socket = io.listen(server)

URLS = {
  'video': 'http://youtube.com',
  'text': 'http://twitter.com',
  'image': 'http://flickr.com',
}

formatted_response = (connection, message) ->
  json = JSON.parse(message)

  JSON.stringify({
    remoteAddress: connection.remoteAddress,
    remotePort: connection.remotePort,
    message: json['message'],
    url: URLS[json['type']]
  })

socket.on('connection', (client) ->
  client.on('message', (message) ->
    reply = formatted_response(client.request.connection, message)

    util.log(reply)
    client.send(reply)
  )

  client.on('disconnect', ->

  )
)
