import { model, Schema } from "mongoose";

const userSchema = new Schema({
    email: String,
    password: String,
    uuid: String,
});

export const User = model("User", userSchema);

const newsSchema = new Schema({
    date: Number,
    text: String,
});

export const News = model("News", newsSchema);
