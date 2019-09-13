import { IGameStats } from "furyroad-interfaces";
import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  uuid: String,
  stats: {
    // [key: string]: Number,
    fuel: Number,
    maxFuel: Number,
    water: Number,
    food: Number,
    scrap: Number,
    carHealth: Number,
    carMaxHealth: Number,
    carTemperature: Number,
    carMaxTemperature: Number,
    distanceDriven: Number,
    carSpeed: Number,
    carMaxSpeed: Number,
    carFuelUsage: Number,
    attackRate: Number,
    defenseRate: Number,
    hoursPassed: Number,
    daysPassed: Number,
    score: Number,
  } 
});

/**
 * User schema
 */
export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  uuid: string;
  stats: IGameStats;
  // getInfo: () => string;
}

// userSchema.methods.getInfo = function() {
//   return this.email + " : " + this.uuid;
// };

export const User = mongoose.model<IUser>("User", userSchema);

/**
 * News schema
 */
const newsSchema = new mongoose.Schema({
  date: Number,
  text: String,
});

export const News = mongoose.model("News", newsSchema);
