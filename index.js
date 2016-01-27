var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/web'));

app.get('/', function(req, res){
  res.sendfile('web/index.html');
});

io.on('connection', function(socket){

  socket.on('add user', function(name){
    socket.username = name;
    io.emit('chat message', {
        username: 'Admin',
        message: name + ' has joined the chat.'
    });
  });

  socket.on('chat message', function(data){
    io.emit('chat message', {      
        username: socket.username,
        message: data
    });
  });
  
  socket.on('disconnect', function(){
    io.emit('chat message', {
        username: 'Admin',
        message: socket.username + ' has left the chat.'
    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});