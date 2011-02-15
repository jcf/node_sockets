$( ->
  socket = new io.Socket('localhost', {port: 3000})
  socket.connect()
  $.socket = socket

  append_message = (message) ->
    json = JSON.parse(message)
    console.log(json)
    $('#url').html("<a href=\"#{json['url']}\">#{json['url']}</a>")
    $('#messages').prepend("<p>#{json['message']}</p>")

  socket.on('message', append_message)

  $('form').submit((e)->
    e.preventDefault()
    json = JSON.stringify({
      type: $('#type').val(),
      message: $('#message').val()
    })
    socket.send(json)
    false
  )

  $('ul.phrases li').click((e) ->
    $('#message').val($(this).text())
  )
)
