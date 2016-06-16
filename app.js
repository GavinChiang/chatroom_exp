var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//read index
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

    console.log('someone is comming!!');

    //new user enter
    socket.on('new user', function(msg) {
        socket.username = msg;
        console.log(msg + " log in");
        io.emit('new user', { username:socket.username });
    });

    //message event
    socket.on('chat message', function(msg) {
        console.log(socket.username + " : " + msg);
        io.emit('chat message', { username:socket.username, msg:msg });
        // io.emit('chat message', msg);
    });

    //someone leave

    socket.on('disconnect', function() {
        console.log(socket.username + " left");

        io.emit('user left', { username:socket.username });
    });
});

//assign port 
http.listen(process.env.PORT || 3000, function() {
    console.log('listening on port!!');
});
