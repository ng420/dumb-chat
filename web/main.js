$(function() {
	var username = prompt("Please enter your username", "Harry Potter");
    var socket = io();
    socket.emit('add user', username);

    var colors = [
        '#00BFFF', '#228B22', '#4B0082', '#800000',
        '#FF4500', '#7B68EE', '#D2691E', '#FFA500'
    ]

	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});
    
    function getUserColor(username) {
        var sum = 0;
        for (var i = 0; i < username.length; i++) {
            sum += username.charCodeAt(i);
        }
        sum %= colors.length;
        return colors[sum];
    }

	socket.on('chat message', function(data){
        var $usernameDiv = $('<span class="username"/>')
            .text(data.username + ":")
            .css('color', getUserColor(data.username));
        
        var $msgTextDiv = $('<span class="msgText">')
            .text(data.message);

        var $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .append($usernameDiv, $msgTextDiv);

        $('#messages').append($messageDiv);
	});
});