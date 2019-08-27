"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var http_1 = __importDefault(require("http"));
var app = express_1.default();
var PORT = 80;
var httpServer = http_1.default.createServer(app);
var router = express_1.default.Router();
// const sqlite: sqlite3.sqlite3 = sqlite3.verbose();
// const DBSOURCE: string = __dirname + "/db.sqlite";
// console.log(fs.readFileSync(__dirname + "/dbstructure.sql").toString());
// const sqlFileContent: string[] =
//     fs.readFileSync(__dirname + "/dbstructure.sql").toString().split(";").filter((el) => el.length !== 0);
// interface IUser {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
// }
// interface IResponseType {
//     data: any | undefined;
//     error: string | undefined;
//     message: string | undefined;
// }
// const db = new sqlite.Database(DBSOURCE, (error) => {
//     if (error) {
//       // Cannot open database
//       console.error(error.message);
//     //   throw error;
//     } else {
//         console.log("Connected to the SQLite database.");
//         // sqlFileContent.forEach((value: string, index: number, arr: string[]) => {
//         //     db.run(value, (err: Error) => {
//         //         if (err) {
//         //             console.log("ERROR: " + err.message);
//         //         }
//         //     });
//         // });
//         // db.run(sqlFileContent, (err: Error) => {
//         //     if (err) {
//         //         // Table already created
//         //         console.log(err.message);
//         //     } else {
//         //         // Table just created, creating some rows
//         //         // const insert = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
//         //         // db.run(insert, ["admin1", "admin1@example.com", md5("admin123456")]);
//         //         // db.run(insert, ["user2", "user2@example.com", md5("user123456")]);
//         //     }
//         // });
//     }
// });
// app.use(express.static("build"));
function loggerMiddleware(request, response, next) {
    console.log("MIDDLEWARE: " + request.method + " " + request.path);
    // console.log(songName0);
    // console.log(fs.readFileSync(__dirname + "/dbstructure.sql").toString());
    // console.log(sqlFileContent);
    // if (songFile0.isFile()) {
    //     console.log("File size: " + songFile0.size);
    // }
    // console.log(db);
    next();
}
httpServer.listen(PORT, "localhost");
app.use(loggerMiddleware);
app.use(body_parser_1.default.json());
app.use("/api", router);
app.get("/user", function (request, response, next) {
    console.log(request.query);
    response.send(request.query.name + ", " + request.query.id);
});
app.get("/song", function (request, response, next) {
    var songName0 = __dirname + "/music/music1.mp3";
    try {
        var songFile0 = fs_1.default.statSync(songName0);
        if (songFile0.isFile() && songFile0.size > 0) {
            console.log("File " + songName0 + " is ok!");
            response.writeHead(200, {
                "Content-Length": songFile0.size,
                "Content-Type": "audio/mpeg",
            });
            var reader = fs_1.default.createReadStream(songName0, {
                autoClose: true,
                flags: "r",
            });
            // reader.on("open", () => {
            //     console.log("Opening file...");
            // });
            // reader.on("close", () => {
            //     console.log("File is closed.");
            // });
            // reader.on("readable", () => {
            //     console.log("File is ready for reading.");
            // });
            reader.pipe(response);
        }
    }
    catch (err) {
        console.log(err);
    }
});
/**
 * ROUTER
 */
router.get("/user/id/:id", function (request, response, next) {
    var sql = "select * from user where id = ?";
    var params = [request.params.id];
    // db.get(sql, params, (err: Error, row: IUser) => {
    //     if (!err) {
    //         if (row !== undefined || row != null) {
    //             const resp: IResponseType = {data: row, error: undefined, message: "Success"};
    //             response.json(resp);
    //         } else {
    //             const resp: IResponseType = {data: undefined, error: `User with id = ${request.params.id} not found`, message: undefined};
    //             response.json(resp);
    //         }
    //     } else {
    //         const resp: IResponseType = {data: undefined, error: "Database error. " + err.message, message: undefined};
    //         response.json(resp);
    //     }
    //   });
});
router.get("/user/name/:n", function (request, response, next) {
    var sql = "select * from user where name = ?";
    var params = [request.params.n];
    // db.get(sql, params, (err: Error, row: IUser) => {
    //     if (!err) {
    //         if (row !== undefined || row != null) {
    //             const resp: IResponseType = {data: row, error: undefined, message: "Success"};
    //             response.json(resp);
    //         } else {
    //             const resp: IResponseType = {data: undefined, error: `User with name = ${request.params.n} not found`, message: undefined};
    //             response.json(resp);
    //         }
    //     } else {
    //         const resp: IResponseType = {data: undefined, error: "Database error. " + err.message, message: undefined};
    //         response.json(resp);
    //     }
    //   });
});
router.all("/users", function (request, response, next) {
    // const sql: string = "SELECT * FROM 'user'";
    // const params: string[] = [request.params.id];
    // response.send("OK, pal!");
    // const sqlite: sqlite3.sqlite3 = sqlite3.verbose();
    var DBSOURCE = __dirname + "/db.sqlite";
    // console.log(fs.readFileSync(__dirname + "/dbstructure.sql").toString());
    // const sqlFileContent: string[] =
    // fs.readFileSync(__dirname + "/dbstructure.sql").toString().split(";").filter((el) => el.length !== 0);
    // response.send(sqlFileContent.toString());
    response.send("The Silent Enigma !!!");
    // const db = new sqlite.Database(DBSOURCE, (error) => {
    //     if (error) {
    //     // Cannot open database
    //     console.error(error.message);
    //     response.send("Error: " + error.message);
    //     //   throw error;
    //     } else {
    //         console.log("Connected to the SQLite database.");
    //         response.send("Connected to the SQLite DataBase.");
    //         // sqlFileContent.forEach((value: string, index: number, arr: string[]) => {
    //         //     db.run(value, (err: Error) => {
    //         //         if (err) {
    //         //             console.log("ERROR: " + err.message);
    //         //         }
    //         //     });
    //         // });
    //         // db.run(sqlFileContent, (err: Error) => {
    //         //     if (err) {
    //         //         // Table already created
    //         //         console.log(err.message);
    //         //     } else {
    //         //         // Table just created, creating some rows
    //         //         // const insert = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
    //         //         // db.run(insert, ["admin1", "admin1@example.com", md5("admin123456")]);
    //         //         // db.run(insert, ["user2", "user2@example.com", md5("user123456")]);
    //         //     }
    //         // });
    //     }
    // });
    // db.all(sql, params, (err: Error, row: IUser[]) => {
    //     if (err) {
    //       response.status(400).json({error: err.message});
    //       return;
    //     }
    //     response.json({
    //         data: row,
    //         message: "success",
    //     });
    // });
});
