# node_sockets

Mashing up Sinatra, node.js and socket.io to send messages via websockets to a
server that sends some messy JSON back in response.

## Server

This is a node.js application that uses socket.io-node to listen to for
connections from the socket.io client.

The message it receives consists of some stringified JSON, which contains a
message and a type. The type will determine which of three URLs are returned and
the message is simply echo'd back to the client. It could be broadcast instead.

## Client

The client is a sinatra app that renders a simple form that's wrapped in some
hacky jQuery.

Basically the submit event gets swallowed and the message and type get
stringified and sent via the socket.io socket.

The result is parsed and inserted in to a couple of DIVs. Handlebars.js or
Mustache should be used to build the HTML from the response but this is just a
proof of concept.

## Get It Running

    git clone git://github.com/jcf/node_sockets.git
    cd node_sockets
    rvm rvmrc load
    bundle install # after creating the RVM gemset
    node server/lib/app.js &
    shotgun client/app.rb

Visit http://localhost:9393 in your browser and starting sending messages!

### Requirements

Most things are managed with Bundler but you'll have to npm install socket.io
manually until I set up npm properly.

 - node.js
 - npm
 - coffeescript
 - Ruby 1.9.2
 - bundler

The sinatra app won't run on Ruby 1.8. Not because it can't but because I am
using 1.9.2 and don't care about support etc. with a project like this.

### Support and Contributions

Don't. This is a proof-of-concept. It's a learning experience for me. If you
find any of it useful great but you'll no doubt want to use a more mature
project for inspiration and proper education.
