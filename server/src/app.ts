import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import fs from "fs";
import http from "http";

import { headerMiddleware, loggerMiddleware } from "./middleware";
import { loginRouter, newsRouter, usersRouter } from "./routes";

// ==========================================================================
dotenv.config();
const app: Application = express();
const PORT: number = 3030;
const httpServer = http.createServer(app);
// ==========================================================================

// console.log(fs.readFileSync(__dirname + "/dbstructure.sql").toString());

// const sqlFileContent: string[] =
//     fs.readFileSync(__dirname + "/dbstructure.sql").toString().split(";").filter((el) => el.length !== 0);

httpServer.listen(PORT, "localhost");

httpServer.on("listening", () => console.info(`Listening on port: ${PORT}.`));

httpServer.on("error", err => console.error(err));

app.use(loggerMiddleware);
app.use(headerMiddleware);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", usersRouter);
app.use("/api/news", newsRouter);
app.use("/api/login", loginRouter);

/**
 * GET /song - request for streaming music.
 */
app.get("/song", (request: Request, response: Response, next: NextFunction) => {
  const songPath = __dirname + "/music/music1.mp3";
  try {
    const songFile: fs.Stats = fs.statSync(songPath);
    if (songFile.isFile() && songFile.size > 0) {
      console.log(`Sending ${songPath} to client.`);
      response.writeHead(200, {
        "Content-Length": songFile.size,
        "Content-Type": "audio/mpeg",
      });
      const reader: fs.ReadStream = fs.createReadStream(songPath, {
        autoClose: true,
        flags: "r",
      });
      reader.pipe(response);
    }
  } catch (err) {
    console.log(err);
  }
});
