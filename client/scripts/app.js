// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  friends: [],
  rooms: []
};

app.init = function() {
  $(document).on('click', 'div.username', function() {
    console.log($(this));
    app.handleUsernameClick($(this).text());
  });

  $(document).on('click', 'input.post-input', function() {
    console.log($(this).val());
    app.send({
      username: window.location.search,
      text: $(this).val(),
      roomname: 'hardCodedLobby'
    })
  });

  $(document).on('change', 'select', function() {
    var optionSelected = $(this).find("option:selected");
    var valueSelected  = optionSelected.val();

    console.log(valueSelected);
  });  
  
  app.fetch(
    'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
  );
};

app.send = function(obj) {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(obj),
    contentType: 'application/json',
    success: function(data) {
      console.log('chatterbox: Message sent');
      console.log(obj);
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
      var acceptableMessages = data.results //.filter (function(obj) {
        // if (obj.username !== undefined && 
        //   obj.text !== undefined &&
        //   obj.text.length > 280 &&
        //   obj.roomname !== undefined &&
        //   obj.text !== '' &&
        //   obj.username !== '' &&
        //   obj.roomname !== '') {
        //   return obj;
        // }        
      // });

      console.log(acceptableMessages);

      for (var i = 0; i < acceptableMessages.length; i++) {
        app.renderMessage(acceptableMessages[i]);
      }
      app.addRoom(acceptableMessages)
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
  // var username = app.sanitize(obj.username);
  // if (obj.text === undefined) {
  //   var text = "";
  // } else {
  //   var text = app.sanitize(obj.text);
  // }

  // var rooomname = app.sanitize(obj.roomname);

  $('#chats').append('<div class="username">' + obj.username + '-'+ obj.text + '</div>');
};

app.renderRoom = function(string) {
  $('#roomSelect').append('<p>sorry</p>');
};

app.handleUsernameClick = function(username) {
  app.friends.push(username);
};

app.sanitize = function(string) {
  return string
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

app.addRoom = function(results) {
  var rooms = {};
  for (var i = 0; i < results.length; i++) {
    rooms[results[i].roomname] = true;
  }

  for (var i = 0; i < Object.keys(rooms).length; i++) {
    $(".rooms").append('<option value=' + Object.keys(rooms)[i] + '>'+ Object.keys(rooms)[i] + '</option>');
    // $(".rooms").append('<option>'+ Object.keys(rooms)[i] + '</option>');
  }
}

app.init();