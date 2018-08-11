// YOUR CODE HERE:
var app = {
  friends: [],
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};

app.init = function() {
  $('body').on('click', 'div.username', function() {
    app.handleUsernameClick($(this).text());
  });
  var data = app.fetch();
  console.log(data);
};

app.send = function(obj) {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(obj),
    contentType: 'application/json'
  });
};

app.fetch = function(url, callback) {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET'
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
