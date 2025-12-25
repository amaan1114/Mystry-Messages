import mongoose from "mongoose";
import { Cabin_Sketch } from "next/font/google";
import { ca } from "zod/v4/locales";

type ConnectionObject ={
    isConnected?:number
}

const connection:ConnectionObject={};

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }
    try{
        const db=await mongoose.connect(process.env.MONGO_URI || "");
        connection.isConnected = db.connections[0].readyState;
        console.log("DB connected Successfully")
    }
    catch(error){
        console.log("Error connecting to db",error);
        process.exit(1);

    }
}
export default dbConnect;