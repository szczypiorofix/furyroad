import bodyParser from "body-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import fs from "fs";
import http from "http";
import md5 from "md5";
import sqlite3 from "sqlite3";
// import { GameStats } from "../src/models";

const app: Application = express();
const PORT: number = 80;
const httpServer = http.createServer(app);

const router = express.Router();

const sqlite: sqlite3.sqlite3 = sqlite3.verbose();
const DBSOURCE: string = __dirname + "/db.sqlite";

const sqlFileContent: string[] =
    fs.readFileSync(__dirname + "/dbstructure.sql").toString().split(";").filter((el) => el.length !== 0);

interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface IResponseType {
    data: any | undefined;
    error: string | undefined;
    message: string | undefined;
}

const db = new sqlite.Database(DBSOURCE, (error) => {
    if (error) {
      // Cannot open database
      console.error(error.message);
      throw error;
    } else {
        console.log("Connected to the SQLite database.");

        sqlFileContent.forEach((value: string, index: number, arr: string[]) => {
            db.run(value, (err: Error) => {
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

app.use(express.static("build"));

const songName0 = __dirname + "//music/music1.mp3";
const songFile0 = fs.statSync(songName0);

function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
    console.log(`${request.method} ${request.path}`);
    next();
}

httpServer.listen(PORT, "localhost");

app.use(loggerMiddleware);
app.use(bodyParser.json());

app.use("/api", router);

// app.get("/", (request: Request, response: Response, next: NextFunction) => {
//     response.sendFile(__dirname + "/build/index.html");
// });

app.get("/user", (request: Request, response: Response, next: NextFunction) => {
    console.log(request.query);
    response.send(request.query.user + ", " + request.query.id);
});

app.get("/song", (request: Request, response: Response, next: NextFunction) => {
    response.writeHead(200, {
        "Content-Length": songFile0.size,
        "Content-Type": "audio/mpeg",
    });
    fs.createReadStream(songName0).pipe(response);
});

/**
 * ROUTER
 */
router.get("/user/id/:id", (request: Request, response: Response, next: NextFunction) => {
    const sql: string = "select * from user where id = ?";
    const params: string[] = [request.params.id];
    db.get(sql, params, (err: Error, row: IUser) => {
        if (!err) {
            if (row !== undefined || row != null) {
                const resp: IResponseType = {data: row, error: undefined, message: "Success"};
                response.json(resp);
            } else {
                const resp: IResponseType = {data: undefined, error: `User with id = ${request.params.id} not found`, message: undefined};
                response.json(resp);
            }
        } else {
            const resp: IResponseType = {data: undefined, error: "Database error. " + err.message, message: undefined};
            response.json(resp);
        }
      });
});

router.get("/user/name/:n", (request: Request, response: Response, next: NextFunction) => {
    const sql: string = "select * from user where name = ?";
    const params: string[] = [request.params.n];
    db.get(sql, params, (err: Error, row: IUser) => {
        if (!err) {
            if (row !== undefined || row != null) {
                const resp: IResponseType = {data: row, error: undefined, message: "Success"};
                response.json(resp);
            } else {
                const resp: IResponseType = {data: undefined, error: `User with name = ${request.params.n} not found`, message: undefined};
                response.json(resp);
            }
        } else {
            const resp: IResponseType = {data: undefined, error: "Database error. " + err.message, message: undefined};
            response.json(resp);
        }
      });
});

router.all("/users", (request: Request, response: Response, next: NextFunction) => {
    const sql: string = "SELECT * FROM 'user'";
    const params: string[] = [request.params.id];
    db.all(sql, params, (err: Error, row: IUser[]) => {
        if (err) {
          response.status(400).json({error: err.message});
          return;
        }
        response.json({
            data: row,
            message: "success",
        });
    });
});
