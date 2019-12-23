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

    // socket.on('config', function (obj) {
    //   console.log('config', obj);
    //   oscServer = new osc.Server(obj.server.port, obj.server.host);
    //   oscClient = new osc.Client(obj.client.host, obj.client.port);
  
    //   oscClient.send('/status', socket.id + ' connected');
  
    //   oscServer.on('message', function(msg, rinfo) {
    //     socket.emit('message', msg);
    //     console.log('sent OSC message to WS', msg, rinfo);
    //   });
    // });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        client.send("/gg", 200);
    });

    

    // socket.on('message', function () {
    //     // var toSend = obj.split(' ');
    //     // oscClient.send(...toSend);
    //     // var mymessage = client.send('/oscfuck', 500);
    //     // console.log('sent WS message to OSC', mymessage);
    // });

    socket.on("disconnect", function () {
        console.log('a user disconnected');
    });

  });

http.listen(3000, function(){
    console.log('listening on *:3000')
});