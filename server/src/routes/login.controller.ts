import express, { NextFunction, Request, Response } from "express";
import uuidv1 from "uuid/v1";
import { MongoHelper } from "../helpers";
import { IResponseType, User } from "../models";

const loginRouter = express.Router();

/**
 * GET api/login - login
 */
loginRouter.post("/", (request: Request, response: Response, next: NextFunction) => {
    const reqEmail: string | undefined = request.body.email;
    const reqPass: string | undefined = request.body.password;

});

export { loginRouter };
