import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";


export async function GET(request:Request){
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user = session?.user
    const {searchParams} = new URL(request.url);
    const messageID = searchParams.get('messageID');
    try{
         await UserModel.findByIdAndUpdate(
        user?._id,
        { $pull: { messages: { _id: messageID } } }
        );
        return Response.json({
            success: true,
            message: "Message deleted successfully"
        });
    }catch(error){
        console.log("Error Deleting Message",error)
        return Response.json({
            success:false,
            message:"Internal Server Error",
        },
        {status:500})
    }
   
}
