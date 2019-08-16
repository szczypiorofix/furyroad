"use strict";
exports.__esModule = true;
var body_parser_1 = require("body-parser");
var express_1 = require("express");
var fs_1 = require("fs");
var http_1 = require("http");
var sqlite3_1 = require("sqlite3");
// import { GameStats } from "../src/models";
/**
 * Express app main object.
 */
var app = express_1["default"]();
/**
 * Server port.
 */
var PORT = 80;
/**
 * HTTP server object.
 */
var httpServer = http_1["default"].createServer(app);
var router = express_1["default"].Router();
// SQLITE
var sqlite = sqlite3_1["default"].verbose();
var DBSOURCE = "db.sqlite";
var sqlFileContent = fs_1["default"].readFileSync(__dirname + "/dbstructure.sql").toString().split(";").filter(function (el) { return el.length !== 0; });
var db = new sqlite.Database(DBSOURCE, function (error) {
    if (error) {
        // Cannot open database
        console.error(error.message);
        throw error;
    }
    else {
        console.log("Connected to the SQLite database.");
        sqlFileContent.forEach(function (value, index, arr) {
            db.run(value, function (err) {
                if (err) {
                    console.log("ERROR: " + err.message);
                }
            });
        });
        // db.run(sqlFileContent, (err: Error) => {
        //     if (err) {
        //         // Table already created
        //         console.log(err.message);
        //     } else {
        //         // Table just created, creating some rows
        //         // const insert = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
        //         // db.run(insert, ["admin1", "admin1@example.com", md5("admin123456")]);
        //         // db.run(insert, ["user2", "user2@example.com", md5("user123456")]);
        //     }
        // });
    }
});
var songName0 = "music/music1.mp3";
var songFile0 = fs_1["default"].statSync(songName0);
function loggerMiddleware(request, response, next) {
    console.log(request.method + " " + request.path);
    next();
}
httpServer.listen(PORT, "localhost");
app.use(loggerMiddleware);
app.use(body_parser_1["default"].json());
app.use("/api", router);
app.get("/", function (request, response, next) {
    // response.sendFile(__dirname + '/public/index.html');
    response.send("DUPA, DUPA, CYCKI");
    response.end();
});
app.get("/user", function (request, response, next) {
    console.log(request.query);
    response.send(request.query.user + ", " + request.query.id);
});
app.get("/song", function (request, response, next) {
    response.writeHead(200, {
        "Content-Length": songFile0.size,
        "Content-Type": "audio/mpeg"
    });
    fs_1["default"].createReadStream(songName0).pipe(response);
});
/**
 * ROUTER
 */
router.get("/user/:id", function (request, response, next) {
    var sql = "select * from user where id = ?";
    var params = [request.params.id];
    db.get(sql, params, function (err, row) {
        if (err) {
            response.status(400).json({ error: err.message });
            return;
        }
        response.json({
            data: row,
            message: "success"
        });
    });
});
router.all("/users", function (request, response, next) {
    var sql = "SELECT * FROM 'user'";
    var params = [request.params.id];
    db.all(sql, params, function (err, row) {
        if (err) {
            response.status(400).json({ error: err.message });
            return;
        }
        console.log(row[0].name);
        response.json({
            data: row,
            message: "success"
        });
    });
});
