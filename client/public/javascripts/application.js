(function() {
  $(function() {
    var append_message, socket;
    socket = new io.Socket('localhost', {
      port: 3000
    });
    socket.connect();
    $.socket = socket;
    append_message = function(message) {
      var json;
      json = JSON.parse(message);
      console.log(json);
      $('#url').html("<a href=\"" + json['url'] + "\">" + json['url'] + "</a>");
      return $('#messages').prepend("<p>" + json['message'] + "</p>");
    };
    socket.on('message', append_message);
    $('form').submit(function(e) {
      var json;
      e.preventDefault();
      json = JSON.stringify({
        type: $('#type').val(),
        message: $('#message').val()
      });
      socket.send(json);
      return false;
    });
    return $('ul.phrases li').click(function(e) {
      return $('#message').val($(this).text());
    });
  });
}).call(this);
