import mongoose from "mongoose";
import { DB_NAME } from '../constant.js';
import dotenv from "dotenv";

dotenv.config({ path:"./env" });

const dbUri = process.env.DB_URI || `mongodb+srv://prit9265:12345@cluster0.bpsjfm6.mongodb.net`;

const ConnectionDB = async () => {
  try {
    const DB = await mongoose.connect(`${dbUri}/${DB_NAME}`);
    console.log(mongoose.connection.host);
  } catch (error) {
    console.log("DB Connection Error!!! :", error);
  }
};

export { ConnectionDB };
