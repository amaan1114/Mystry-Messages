import { UserModel } from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import {success, z} from "zod";
import { usernameValidation } from "@/Schemas/signUpSchema";
import { fa } from "zod/locales";

const userNameQuerySchema = z.object({
     username:usernameValidation
})

export async function GET(request:Request){
   
    await dbConnect(); 
     
    try{
        const {searchParams }  = new URL(request.url)
        const queryParams={
            username:searchParams.get("username")||" "
        }

        //Validate with Zod
        const result = userNameQuerySchema.safeParse(queryParams)
        console.log(result)
        if(!result.success){
            const userNameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success:false,
                message:"Invalid Username"
            },
            {status:400})
        }

        const {username} = result.data;

        const existingVerifiedUser= await UserModel.findOne({
            username:username,
            isVerified:true
        })

        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:"Username is already taken"
            },
        {status:400 })
        }
          return Response.json({
                success:true,
                message:"Username is available"
            },
        {status:200 })

        
    }catch(error){
        console.log("Error checking username",error)
        return Response.json({
            success:false,
            message:"Internal Server Error",
            
        },
    {status:500 })
    }
}
