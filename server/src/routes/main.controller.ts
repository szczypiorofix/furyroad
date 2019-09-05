import express, { NextFunction, Request, Response } from "express";
import uuidv1 from "uuid/v1";
import { MongoHelper } from "../helpers";

const apiRouter = express.Router();

const getUsersCollection = () => {
    return MongoHelper.client.db("mo1394_frdb").collection("users");
};

const getNewsCollection = () => {
    return MongoHelper.client.db("mo1394_frdb").collection("news");
};

interface IUsersInfo {
    _id: number;
    email: string;
    uuid: string;
}

interface INewsInfo {
    _id: number;
    date: string;
    text: string;
}

/**
 * GET api/news - get all news from database
 */
apiRouter.get("/news", (request: Request, response: Response, next: NextFunction) => {
    const newsCollection = getNewsCollection();
    newsCollection.find({}).toArray( (err, items: INewsInfo[]) => {
        if (err) {
            response.status(500);
            response.end();
            console.error(err);
        } else {
            items = items.map( (item) => (item) );
            response.status(200).json(items);
        }
    });
});

/**
 * POST api/news - insert user info into database
 */
apiRouter.post("/news", (request: Request, response: Response, next: NextFunction) => {
    const reqText: string | undefined = request.body.text;
    if (reqText) {
        const timestamp: number = Date.now();
        const usersCollection = getNewsCollection();
        usersCollection.insertOne({date: timestamp, text: reqText})
        .then( (a) => response.status(201).json("Successfully created news data."))
        .catch( (err) => console.error(err));
    } else {
        response.status(400).end("No text in headers!");
    }
});

/**
 * GET api/users - get all users from database
 */
apiRouter.get("/users", (request: Request, response: Response, next: NextFunction) => {
    // mongoose.connect(mongodbname, { useNewUrlParser: true })
    // .then( () => {
    //     User.find((err, res) => {
    //         if (err) { response.end('{"error":"An error with MongoDB find method occured!"}'); }
    //         response.end(JSON.stringify(res));
    //     }).select("-password");
    // } )
    // .catch( (error: MongoError) => {
    //     console.log(error);
    //     const err: IResponseType = {
    //         data: [],
    //         msg: "Error",
    //         statusCode: 400,
    //     };
    //     response.end(JSON.stringify(err));
    // });
    const usersCollection = getUsersCollection();
    usersCollection.find({}).toArray( (err, items: IUsersInfo[]) => {
        if (err) {
            response.status(500);
            response.end();
            console.error(err);
        } else {
            items = items.map( (item) => (item) );
            response.status(200).json(items);
        }
    });
});

/**
 * GET api/login - login
 */
apiRouter.post("/login", (request: Request, response: Response, next: NextFunction) => {
    // mongoose.connect(mongodbname, { useNewUrlParser: true })
    // .then( () => {
    //     User.find((err, res) => {
    //         if (err) { response.end('{"error":"An error with MongoDB find method occured!"}'); }
    //         response.end(JSON.stringify(res));
    //     }).select("-password");
    // } )
    // .catch( (error: MongoError) => {
    //     console.log(error);
    //     const err: IResponseType = {
    //         data: [],
    //         msg: "Error",
    //         statusCode: 400,
    //     };
    //     response.end(JSON.stringify(err));
    // });

    const reqEmail: string | undefined = request.body.email;
    const reqPass: string | undefined = request.body.password;
    console.log(request.body);
    if (reqEmail && reqPass) {
        const usersCollection = getUsersCollection();
        usersCollection.findOne(
            { email: reqEmail, password: reqPass },
            (err, item) => {
            if (err) {
                console.error(err);
            } else {
                console.log(item);
                if (item) {
                    response.status(200).json({email: item.email, uuid: item.uuid});
                } else {
                    response.status(200).end('{"msg": "User not found!"}');
                }
            }
        });
    } else {
        response.status(400).end("No email and/or password and/or new password in headers!");
    }
});

/**
 * POST api/users - insert user info into database
 */
apiRouter.post("/users", (request: Request, response: Response, next: NextFunction) => {
    const reqEmail: string | undefined = request.body.email;
    const reqPass: string | undefined = request.body.password;
    if (reqEmail && reqPass) {
        const uuid: string = uuidv1();
        const usersCollection = getUsersCollection();
        usersCollection.insertOne({email: reqEmail, uuid, password: reqPass})
        .then( (a) => response.status(201).json("Successfully created user data."))
        .catch( (err) => console.error(err));
    } else {
        response.status(400).end("No email and/or password in headers!");
    }
});

/**
 * PUT api/users - update user info
 */
apiRouter.put("/users", (request: Request, response: Response, next: NextFunction) => {
    const reqEmail: string | undefined = request.body.email;
    const reqPass: string | undefined = request.body.password;
    const newPass: string | undefined = request.body.newpassword;
    console.log(request.body);
    if (reqEmail && reqPass && newPass) {
        const usersCollection = getUsersCollection();
        usersCollection.findOneAndUpdate(
            { email: reqEmail, password: reqPass },
            { $set: { password: newPass } },
            (err, item) => {
            if (err) {
                console.error(err);
            } else {
                if (item.value) {
                    response.status(200).end('{"msg": "User info updated"}');
                } else {
                    response.status(200).end('{"msg": "User not found!"}');
                }
            }
        });
    } else {
        response.status(400).end("No email and/or password and/or new password in headers!");
    }
});

/**
 * DELETE api/users - remove user info from database
 */
apiRouter.delete("/users", (request: Request, response: Response, next: NextFunction) => {
    const reqEmail: string | undefined = request.body.email;
    const reqPass: string | undefined = request.body.password;
    if (reqEmail && reqPass) {
        const usersCollection = getUsersCollection();
        usersCollection.findOneAndDelete({email: reqEmail, password: reqPass}, (err, item) => {
            if (err) {
                console.error(err);
            } else {
                if (item.value) {
                    response.status(200).end("User info deleted");
                } else {
                    response.status(200).end("User not found !");
                }
            }
        });
    } else {
        response.status(400).end("No email and/or password in headers!");
    }
});

export { apiRouter };
