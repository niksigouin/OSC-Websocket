var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { Client, Message } = require('node-osc');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    // starts new OSC client on local computer
    const client = new Client('127.0.0.1', 3334);
    // Gets unique user ID for connected user
    var user = socket.id;

    console.log(user + " connected.");

    // Gets every connected client and send a list
    io.clients((error, clients) => {
        if (error) throw error;
        console.log(clients);
        // Sends clients to OSC
        client.send('/client', clients)
        
    });
    
    // Gets the input from the webpage and sends it through OSC
    socket.on('change:interval', function(val, name){
        // Converts the input into an int
        const value = Number(val);
        // Prepares the Message to ship to OSC
        var msg = new Message('/' + user + '/' + name, value);
        client.send(msg);
        // console.log(msg);
    });

    socket.on("disconnect", function () {
        console.log(user + ' disconnected.');
        io.clients((error, clients) => {
            if (error) throw error;
            console.log(clients);
            // Sends clients to OSC
            client.send('/client', clients);
        });
    });
  });
var httpport = 8080;
http.listen(httpport, function(){
    console.log('listening on: ' + httpport)
});