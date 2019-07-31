var app = require('express')();
var http = require('http').createServer(app);
// var io = require('socket.io')(http);
var fs = require('fs');
// var favicon = require('serve-favicon');


var songName0 = 'build/music/music1.mp3';
var songFile0 = fs.statSync(songName0);


// app.use('/', express.static(path.join(__dirname + '/public')));
// app.use('/', express.static(path.join(__dirname + '/public/icons')));
// app.use('/', express.static(path.join(__dirname + '/public/static/css')));
// app.use('/', express.static(path.join(__dirname + '/public/static/js')));
// app.use('/', express.static(path.join(__dirname + '/public/images')));

// app.use(favicon(path.join(__dirname, 'public/icons', 'favicon.ico')));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/build/index.html');
});

app.get('/max', (request, response, nest) => {
    response.set('Content-Type', 'application/json');
    response.send('{"message":"He\'s just a raggedy man!" }');
});

app.get('/masterblaster', (request, response, next) => {
    response.set('Content-Type', 'application/json');
    response.send('{"message":"Who run Bartertown?" }');
});


app.get('/song', function(request, response, next) {
    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': songFile0.size
    });
    fs.createReadStream(songName0).pipe(response);
});

http.listen(80, 'localhost');

