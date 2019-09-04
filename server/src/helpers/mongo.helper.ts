import mongodb, { MongoClient } from "mongodb";

export class MongoHelper {

    public static client: mongodb.MongoClient;

    public static connect(url: string) {
        return new Promise( (resolve, reject) => {
            mongodb.connect(url, { useNewUrlParser: true }, (err, client: MongoClient) => {
                if (err) {
                    reject(err);
                } else {
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
        });
    }
}
