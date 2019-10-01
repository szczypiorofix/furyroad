import express, { NextFunction, Request, Response, Router } from "express";
import { defaultStats, IGameStats, ILoginResponseType, IResponseType } from "furyroad-interfaces";
import uuidv1 from "uuid";
import { MongoHelper } from "../helpers";
import { User } from "../models";

const usersRouter: Router = express.Router();

/**
 * GET api/users - get all users from database
 */
usersRouter.get("/", (request: Request, response: Response, next: NextFunction) => {
  MongoHelper.connect()
    .then(() => {
      User.find({}, "email uuid", (err, results) => {
        if (err) {
          const responseToClient: IResponseType = {
            data: [],
            error: err,
            msg: "Ooops! Something went wrong, mister.",
            statusCode: 400,
          };
          response
            .status(responseToClient.statusCode)
            .json(responseToClient)
            .end();
        } else {
          // results.forEach(element => {
          //   console.log(element.getInfo());
          // });
          const responseToClient: IResponseType = {
            data: results,
            error: undefined,
            msg: "Success",
            statusCode: 200,
          };
          response
            .status(responseToClient.statusCode)
            .json(responseToClient)
            .end();
        }
      });
    })
    .catch(err => console.error(err));
});

/**
 * POST api/users - insert new user into database
 */
usersRouter.post("/", (request: Request, response: Response, next: NextFunction) => {
  const email: string | undefined = request.body.email;
  const password: string | undefined = request.body.password;

  if (!email || !password) {
    const responseToClient: IResponseType = {
      data: [],
      error: "No text in http headers!",
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
      let responseToClient: IResponseType = {
        data: [],
        error: undefined,
        msg: "Success - a user has been added to the database.",
        statusCode: 200,
      };
      const uuid = uuidv1();
      let userAlreadyInDatabase: boolean = true;
      User.find({ email }, "email", (err, results) => {
        if (err) {
          responseToClient = {
            data: [],
            error: err,
            msg: "Ooops! Something went wrong, mister.",
            statusCode: 400,
          };
          response
            .status(responseToClient.statusCode)
            .json(responseToClient)
            .end();
        } else {
          if (results.length === 0) {
            responseToClient = {
              data: results,
              error: undefined,
              msg: "Success",
              statusCode: 200,
            };
            userAlreadyInDatabase = false;
          } else {
            responseToClient = {
              data: [],
              error: "Użytkownik o podanym adresie e-mail już istnieje w bazie danych!",
              msg: "Warning",
              statusCode: 200,
            };
          }
          response
            .status(responseToClient.statusCode)
            .json(responseToClient)
            .end();
        }
      });

      if (!userAlreadyInDatabase) {
        const newUser = new User({ email, password, uuid, stats: defaultStats });
        newUser
          .save()
          .then(() => {
            console.info(`User ${email} has been added.`);
            response
              .status(responseToClient.statusCode)
              .json(responseToClient)
              .end();
          })
          .catch(err => {
            console.error(err);
            const errorStatus: IResponseType = {
              data: [],
              error: err,
              msg: "Error",
              statusCode: 400,
            };
            response
              .status(errorStatus.statusCode)
              .json(errorStatus)
              .end();
          });
      }
    })
    .catch(err => {
      console.error(err);
      const errorStatus: IResponseType = {
        data: [],
        error: err,
        msg: "Error",
        statusCode: 400,
      };
      response
        .status(errorStatus.statusCode)
        .json(errorStatus)
        .end();
    });
});

/**
 * PUT api/users - update user info
 */
usersRouter.put("/", (request: Request, response: Response, next: NextFunction) => {
  const reqEmail: string | undefined = request.body.email;
  const reqUUID: string | undefined = request.body.uuid;
  const reqStats: IGameStats | undefined = request.body.stats;

  if (!reqEmail || !reqUUID || !reqStats) {
    const responseToClient: ILoginResponseType = {
      data: undefined,
      error: "No login or stats in http headers!",
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
      User.findOneAndUpdate({ email: reqEmail, uuid: reqUUID }, { stats: reqStats }, (err, results) => {
        if (err) {
          const responseToClient: ILoginResponseType = {
            data: undefined,
            error: err,
            msg: "Ooops! Something went wrong, mister.",
            statusCode: 400,
          };
          response
            .status(responseToClient.statusCode)
            .json(responseToClient)
            .end();
        } else {
          const responseToClient: ILoginResponseType = {
            data: undefined,
            error: undefined,
            msg: "Success",
            statusCode: 200,
          };
          response
            .status(responseToClient.statusCode)
            .json(responseToClient)
            .end();
        }
      });
    })
    .catch(err => console.error(err));
});

/**
 * DELETE api/users - remove user info from database
 */
usersRouter.delete("/", (request: Request, response: Response, next: NextFunction) => {
  const reqEmail: string | undefined = request.body.email;
  const reqPass: string | undefined = request.body.password;
});

export { usersRouter };
