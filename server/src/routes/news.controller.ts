import express, { NextFunction, Request, Response } from "express";
import { MongoHelper } from "../helpers";
import { IResponseType, News } from "../models";

const newsRouter = express.Router();

/**
 * GET api/news - get all news from database
 */
newsRouter.get("/", (request: Request, response: Response, next: NextFunction) => {
    MongoHelper.connect()
    .then( () => {
        News.find({}, "date text", (err, results) => {
            if (err) {
                const responseToClient: IResponseType = {
                    data: undefined,
                    error: err,
                    msg: "Ooops! Something went wrong, mister.",
                    statusCode: 404,
                };
                response.status(responseToClient.statusCode).json(responseToClient).end();
            } else {
                const responseToClient: IResponseType = {
                    data: results,
                    error: undefined,
                    msg: "Success",
                    statusCode: 200,
                };
                response.status(responseToClient.statusCode).json(responseToClient).end();
            }
        });
    })
    .catch( (err) => console.error(err));
});

/**
 * POST api/news - insert user info into database
 */
newsRouter.post("/", (request: Request, response: Response, next: NextFunction) => {
    const text: string | undefined = request.body.text;

    if (!text) {
        const responseToClient: IResponseType = {
            data: undefined,
            error: "No text in header!",
            msg: "Ooops! Something went wrong, mister.",
            statusCode: 400,
        };
        response.status(responseToClient.statusCode).json(responseToClient).end();
    }

    MongoHelper.connect()
    .then( () => {
        const responseToClient: IResponseType = {
            data: undefined,
            error: undefined,
            msg: "Success - a user has been added to the database.",
            statusCode: 200,
        };
        const date = new Date();
        const newNews = new News({ date, text });
        newNews.save()
        .then( () => {
            console.info("New post has been added.");
            response.status(responseToClient.statusCode).json(responseToClient).end();
        })
        .catch( (err) => {
            console.error(err);
            const errorStatus: IResponseType = {
                data: undefined,
                error: err,
                msg: "Error",
                statusCode: 400,
            };
            response.status(errorStatus.statusCode).json(errorStatus).end();
        });
    })
    .catch( (err) => {
        console.error(err);
        const errorStatus: IResponseType = {
            data: undefined,
            error: err,
            msg: "Error",
            statusCode: 400,
        };
        response.status(errorStatus.statusCode).json(errorStatus).end();
    });
});

export { newsRouter };
