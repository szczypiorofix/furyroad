"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// Create a new express application instance
var app = express_1.default();
var http = require('http').createServer(app);
var fs = require('fs');
var songName0 = 'music/music1.mp3';
var songFile0 = fs.statSync(songName0);
app.get('/', function (request, response, next) {
    response.sendFile(__dirname + '/public/index.html');
});
app.get('/song', function (request, response, next) {
    console.log("Connection established with: " + request.ip);
    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': songFile0.size
    });
    fs.createReadStream(songName0).pipe(response);
});
http.listen(80, 'localhost');
