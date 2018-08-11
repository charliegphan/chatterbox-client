$(document).ready(function() {
  $('body').on('click', 'div.username', function() {
    app.handleUsernameClick($(this).text());
  });
});
