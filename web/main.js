$(function() {
	var username = prompt("Please enter your username", "Harry Potter");
    var socket = io();
    socket.emit('add user', username);

	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});
    
	socket.on('chat message', function(data){
		$('#messages').append($('<li>').text(data.username + " : " + data.message));
	});
});