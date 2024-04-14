import dotenv from 'dotenv';
import { ConnectionDB } from "./db/db.js";
import {app} from './app.js';

dotenv.config({ path: "./env" });

const port = process.env.PORT || 3000;

ConnectionDB().then(()=>{
    app.listen(port,()=>{
        console.log(`⚙️ Your Server Running On ${port} Port`);
    });
}).catch((error)=>{
    console.log("MongoDB Connection failed");
});
