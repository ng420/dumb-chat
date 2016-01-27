var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/web'));

app.get('/', function(req, res){
  res.sendfile('web/index.html');
});

io.on('connection', function(socket){
  io.emit('chat message', 'a new user has entered the ring');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
	console.log(msg);
  });
  /*socket.on('disconnect', function(){
    io.emit('chat message', 'KO');
  });*/
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});