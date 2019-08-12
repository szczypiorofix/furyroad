import express from 'express';


// Create a new express application instance
const app: express.Application = express();

var http = require('http').createServer(app);
var fs = require('fs');


var songName0 = 'music/music1.mp3';
var songFile0 = fs.statSync(songName0);


app.get('/', function(request, response, next) {
    response.sendFile(__dirname + '/public/index.html');
});

app.get('/song', function(request, response, next) {
    console.log("Connection established with: "+request.ip);
    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': songFile0.size
    });
    fs.createReadStream(songName0).pipe(response);
});

http.listen(80, 'localhost');
