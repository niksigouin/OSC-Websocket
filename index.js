var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { Client } = require('node-osc');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    const client = new Client('172.16.1.107', 3334);

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        client.send("/gg", 200);
    });

    socket.on("disconnect", function () {
        console.log('a user disconnected');
    });
  });

http.listen(3000, function(){
    console.log('listening on *:3000')
});