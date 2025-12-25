import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { User } from "next-auth";  
import mongoose from "mongoose";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import { success } from "zod";
import { fa } from "zod/locales";

export async function GET(request:Request){
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user = session?.user
  
    if(!session || !session.user){
        return Response.json({
            success:false,
        message:"Unauthorized"},
    {status:401})
    }
    const userId =
    typeof user._id === "string"
    ? new mongoose.Types.ObjectId(user._id)
    : user._id;
   
    try{
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            {
                $unwind: {
                path: "$messages",
                preserveNullAndEmptyArrays: true,
                },
            },
            { $sort: { "messages.createdAt": -1 } },
            {
                $group: {
                _id: "$_id",
                messages: { $push: "$messages" },
                },
            },
            ]);

        console.log(user)

        if(user.length===0){
            return Response.json({
                success:false,
                message:"user not found"
            },
        {status:404})
        }
        return Response.json({
                success:true,
                messages:user[0].messages
            },
        {status:200})

    }catch(error)
     {
        console.log("error in connecting",error);
        return Response.json({
            success:false,
            message:"Internal Server Error"
        },
    {status:500})
     }
}