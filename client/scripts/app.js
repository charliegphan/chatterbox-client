// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  friends: []
};

app.init = function() {
  $(document).on('click', 'div.username', function() {
    console.log($(this));
    app.handleUsernameClick($(this).text());
  });

  app.fetch(
    'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
  );
};

app.send = function(obj) {
  $.ajax({
    url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(obj),
    contentType: 'application/json',
    success: function(data) {
      console.log('chatterbox: Message sent');
    },
    error: function(data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function(url) {
  return $.ajax(url, {
    type: 'GET',
    contentType: 'application/json',
    data: 'order=-createdAt',
    success: function(data) {
      console.log(data);
      for (var i = 0; i < data.results.length; i++) {
        app.renderMessage(data.results[i]);
      }
    },
    error: function(data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(obj) {
  $('#chats').append('<div class="username">' + obj.username + '</div>');
};

app.renderRoom = function(string) {
  $('#roomSelect').append('<p>sorry</p>');
};

app.handleUsernameClick = function(username) {
  app.friends.push(username);
};

app.init();