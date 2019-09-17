import express, { NextFunction, Request, Response, Router } from "express";
import { ILoginResponseType } from "furyroad-interfaces";
import { MongoHelper } from "../helpers";
import { User } from "../models";

const loginRouter: Router = express.Router();

/**
 * POST api/login - login
 */
loginRouter.post("/", (request: Request, response: Response, next: NextFunction) => {
  const reqEmail: string | undefined = request.body.email;
  const reqPass: string | undefined = request.body.password;

  if (!reqEmail || !reqPass) {
    const responseToClient: ILoginResponseType = {
      data: undefined,
      error: "No login in http headers!",
      msg: "Ooops! Something went wrong, mister.",
      statusCode: 400,
    };
    response
      .status(responseToClient.statusCode)
      .json(responseToClient)
      .end();
  }

  MongoHelper.connect()
    .then(() => {
      User.findOne({ email: reqEmail, password: reqPass }, "email uuid stats", (err, results) => {
        if (err) {
          const responseToClient: ILoginResponseType = {
            data: undefined,
            error: err,
            msg: "Ooops! Something went wrong, mister.",
            statusCode: 400,
          };
          response
            // .status(responseToClient.statusCode)
            .json(responseToClient)
            .end();
        } else {
          const responseToClient: ILoginResponseType = {
            data: undefined,
            error: undefined,
            msg: "Success",
            statusCode: 200,
          };
          if (results !== null) {
            responseToClient.data = results;
          } else {
            responseToClient.msg = "Nie znaleziono użytkownika";
          }
          response
            .status(responseToClient.statusCode)
            .json(responseToClient)
            .end();
        }
      });
    })
    .catch(err => console.error(err));
});

export { loginRouter };
