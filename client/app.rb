require 'sinatra'
require 'haml'

get('/') { haml :client }
