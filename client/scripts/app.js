// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  friends: [],
  rooms: [],
  data: undefined,
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
    app.renderRoom(valueSelected);
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
    // data: 'order=-createdAt',
    success: function(data) {
      console.log(data);
      // debugger;
      app.data = data.results;
      
      for (var i = 0; i < data.results.length; i++) {
        app.renderMessage(data.results[i]);
      }

      app.addRoom(data.results);
      


    },
    error: function(data) {
      console.error('chatterbox: Failed to send message', data);
    }
    //.filter (function(obj) {
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

  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(obj) {
  var newNode = $('<div></div>');
  newNode.text(obj.username);
  $('#chats').append(newNode);
};

app.renderRoom = function(nameOfRoom) {
  app.clearMessages();

  var filteredObjects = app.data.filter((obj) => {
    return obj.roomname === nameOfRoom;
  })

  filteredObjects.forEach((obj) => {
    app.renderMessage(obj);
  })

  // for (var i = 0; i < app.data.length; i++) {
  //   if (app.data[i].roomname === nameOfRoom) {
  //     app.
  //   }
  // }

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
  console.log(rooms);

  for (var i = 0; i < Object.keys(rooms).length; i++) {
    var newNode = $('<option></option>')
    newNode.text(Object.keys(rooms)[i]);
    // $(".rooms").append('<option value=' + Object.keys(rooms)[i] + '>'+ Object.keys(rooms)[i] + '</option>');
    $(".rooms").append(newNode);
  }
}

app.init();

  // var username = app.sanitize(obj.username);
  // if (obj.text === undefined) {
  //   var text = "";
  // } else {
  //   var text = app.sanitize(obj.text);
  // }

  // var rooomname = app.sanitize(obj.roomname);
