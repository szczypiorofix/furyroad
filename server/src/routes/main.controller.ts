import express, { NextFunction, Request, Response } from "express";
import uuidv1 from "uuid/v1";
import { MongoHelper } from "../helpers";

const router = express.Router();

const getCollection = () => {
    return MongoHelper.client.db("mo1394_frdb").collection("users");
};

interface IUsersInfo {
    _id: number;
    email: string;
    uuid: string;
}

/**
 * GET api/users - get all users from database
 */
router.get("/users", (request: Request, response: Response, next: NextFunction) => {
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
    const collection = getCollection();
    collection.find({}).toArray( (err, items: IUsersInfo[]) => {
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
router.post("/login", (request: Request, response: Response, next: NextFunction) => {
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

    const collection = getCollection();
    collection.find({}).toArray( (err, items: IUsersInfo[]) => {
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
 * POST api/users - insert user info into database
 */
router.post("/users", (request: Request, response: Response, next: NextFunction) => {
    const reqEmail: string | undefined = request.body.email;
    const reqPass: string | undefined = request.body.password;
    if (reqEmail && reqPass) {
        const uuid: string = uuidv1();
        const collection = getCollection();
        collection.insertOne({email: reqEmail, uuid, password: reqPass})
        .then( (a) => response.status(201).json("Successfully created user data."))
        .catch( (err) => console.error(err));
    } else {
        response.status(400).end("No email and/or password in headers!");
    }
});

/**
 * PUT api/users - update user info
 */
router.put("/users", (request: Request, response: Response, next: NextFunction) => {
    const reqEmail: string | undefined = request.body.email;
    const reqPass: string | undefined = request.body.password;
    const newPass: string | undefined = request.body.newpassword;
    console.log(request.body);
    if (reqEmail && reqPass && newPass) {
        const collection = getCollection();
        collection.findOneAndUpdate(
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
router.delete("/users", (request: Request, response: Response, next: NextFunction) => {
    const reqEmail: string | undefined = request.body.email;
    const reqPass: string | undefined = request.body.password;
    if (reqEmail && reqPass) {
        const collection = getCollection();
        collection.findOneAndDelete({email: reqEmail, password: reqPass}, (err, item) => {
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

export { router };
