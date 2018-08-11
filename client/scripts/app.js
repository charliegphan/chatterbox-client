// YOUR CODE HERE:
var app = {
  friends: []
};

app.init = function() {};

app.send = function() {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify({
      username: 'Mel Brooks',
      text: 'It\'s good to be the king',
      roomname: 'lobby'
    }),
    contentType: 'application/json'
  });
};

app.fetch = function(url, callback) {
  $.ajax({
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
