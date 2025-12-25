import { UserModel } from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User";


export async function POST(request:Request){
    await dbConnect();

    const {username,content} = await request.json();
    const decodedUsername = decodeURIComponent(username);
    try{
        const user = await UserModel.findOne({username:decodedUsername});
        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },
        {status:404})
        }
         //is user accepting
         if(!user.isAccepting){
            return Response.json({
                success:false,
                message:"User is not accepting messages"
            },
            {status:403})
        }
        const newMessage  = {content,createdAt:new Date()}
        console.log(newMessage)
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json({
                success:true,
                message:"Message sent successfully"
            },
        {status:200})
       


    }catch(error){
        console.log("error in sending message",error);
        return Response.json({
                success:false,
                message:"Internal Server Error"
            },
        {status:500})

    }
    
}