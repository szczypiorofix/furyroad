import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import fs from "fs";
import http from "http";
import mysql, { Connection, FieldInfo, MysqlError } from "mysql";

const app: Application = express();
const PORT: number = 3000;
const httpServer = http.createServer(app);

const router = express.Router();

// console.log(fs.readFileSync(__dirname + "/dbstructure.sql").toString());

// const sqlFileContent: string[] =
//     fs.readFileSync(__dirname + "/dbstructure.sql").toString().split(";").filter((el) => el.length !== 0);

interface IUser {
    id: number;
    email: string;
    password: string;
    date_registered: string;
    date_login: string;
    session_code: string;
    first_login_failed: number;
    failed_login_count: number;
}

interface IResponseType {
    data: any | undefined;
    error: MysqlError | undefined;
    message: string | undefined;
}

function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
    console.log(`Request: ${request.method} ${request.path} from ${request.hostname}: ${request.ip}`);
    next();
}

httpServer.listen(PORT, "localhost");

app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use("/api", router);

app.get("/user", (request: Request, response: Response, next: NextFunction) => {
    console.log(request.query);
    response.send(request.query.name + ", " + request.query.id);
});

app.get("/song", (request: Request, response: Response, next: NextFunction) => {
    const songName0 = __dirname + "/music/music1.mp3";
    try {
        const songFile0: fs.Stats = fs.statSync(songName0);
        if (songFile0.isFile() && songFile0.size > 0) {
            console.log(`File ${songName0} is ok!`);
            response.writeHead(200, {
                "Content-Length": songFile0.size,
                "Content-Type": "audio/mpeg",
            });
            const reader: fs.ReadStream = fs.createReadStream(songName0, {
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
    } catch (err) {
        console.log(err);
    }
});

/**
 * ROUTER
 */
router.all("/users", (request: Request, response: Response, next: NextFunction) => {
    dotenv.config();
    const connection: Connection = mysql.createConnection({
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        user: process.env.DB_USER,
    });
    let responseData: IResponseType = {
        data: [],
        error: undefined,
        message: "Success",
    };
    connection.connect();
    connection.query("SELECT * FROM `users`", (err: MysqlError, rows: IUser[], fields: FieldInfo) => {
        let responseStatus: number = 200;
        if (err) {
            responseStatus = 500;
            responseData = {
                data: [],
                error: err,
                message: "Failure",
            };
        } else {
            responseData = {
                data: rows,
                error: undefined,
                message: "Success",
            };
        }
        response.status(responseStatus).header("Content-Type", "application/json").end(JSON.stringify(responseData));
    });
    connection.end();
});
