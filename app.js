var app = require('express')();
var http = require('http').createServer(app);
var fs = require('fs');


var songName0 = 'public/music/music1.mp3';
var songFile0 = fs.statSync(songName0);



app.get('/', function(request, response, next) {
    response.sendFile(__dirname + '/public/index.html');
});

app.get('/max', (request, response, next) => {
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
