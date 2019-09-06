import express, { NextFunction, Request, Response } from "express";
import uuidv1 from "uuid/v1";
import { MongoHelper } from "../helpers";
import { IResponseType, User } from "../models";

const usersRouter = express.Router();

/**
 * GET api/users - get all users from database
 */
usersRouter.get("/", (request: Request, response: Response, next: NextFunction) => {
    MongoHelper.connect()
    .then( () => {
        User.find({}, "email uuid", (err, results) => {
            if (err) {
                const responseToClient: IResponseType = {
                    data: undefined,
                    error: err,
                    msg: "Ooops! Something went wrong, mister.",
                    statusCode: 400,
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
    .catch( (err) => console.error(err) );
});

/**
 * GET api/login - login
 */
usersRouter.post("/login", (request: Request, response: Response, next: NextFunction) => {
    const reqEmail: string | undefined = request.body.email;
    const reqPass: string | undefined = request.body.password;

});

/**
 * POST api/users - insert information about user into database
 */
usersRouter.post("/", (request: Request, response: Response, next: NextFunction) => {
    const email: string | undefined = request.body.email;
    const password: string | undefined = request.body.password;

    if (!email || !password) {
        const responseToClient: IResponseType = {
            data: undefined,
            error: "No text in http headers!",
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
        const uuid = uuidv1();
        const newUser = new User({ email, password, uuid });
        newUser.save()
        .then( () => {
            console.info(`User ${email} has been added.`);
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

/**
 * PUT api/users - update user info
 */
usersRouter.put("/", (request: Request, response: Response, next: NextFunction) => {
    const reqEmail: string | undefined = request.body.email;
    const reqPass: string | undefined = request.body.password;
    const newPass: string | undefined = request.body.newpassword;
});

/**
 * DELETE api/users - remove user info from database
 */
usersRouter.delete("/", (request: Request, response: Response, next: NextFunction) => {
    const reqEmail: string | undefined = request.body.email;
    const reqPass: string | undefined = request.body.password;

});

export { usersRouter };
