var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { Client, Message } = require('node-osc');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    const client = new Client('172.16.1.107', 3334);
// Gets the input from the webpage and sends it through OSC
    socket.on('change:interval', function(data){
        // Converts the input into an int
        const input = Number(data);
        // Prepares the Message to ship to OSC
        var msg = new Message('/slider', input)
        client.send(msg);
        console.log('message: ' + input)
    });

    socket.on("disconnect", function () {
        console.log('a user disconnected');
    });
  });
var httpport = 8080;
http.listen(httpport, function(){
    console.log('listening on: ' + httpport)
});