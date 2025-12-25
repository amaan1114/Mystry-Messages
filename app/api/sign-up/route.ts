import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";
import { SendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request: Request){
    await dbConnect();
    
    try{
       const {username,email,password} = await request.json()
    const existingUserVerifiedByUsername =  await UserModel.findOne({
        username,
        isVerified:true
    }) 
    if(existingUserVerifiedByUsername){
        return Response.json({
            success:false,
            message:"Username already taken"
        },
        {status:400})
    }

        const existingUserByEmail=await UserModel.findOne({
            email
        })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); 
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                 return Response.json({
                    success:false,
                    message:"Username already exist"
                },
                {status:400})
            }else{
                const hashedPassword = await bcrypt.hash(password,10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();

            }
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours()+1);
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAccepting: false,
                messages: [] 
            })
            await newUser.save();
        }
        
        //send Verification email
        const emailResponse = await SendVerificationEmail(email,verifyCode,username);
        console.log("Email Response:",emailResponse);
        if(emailResponse.success){
            return Response.json({
                success:true,
                message:"User registered successfully. Verification email sent."
            },
        {status:201})
        }else{
            return Response.json({
                success:false,
                message:"User registered but failed to send verification email"
            },
        {status:500})
        }
    

    }catch(error){
        console.log("Error in sign-up",error);
        return  Response.json({
            success:false,
            message:"Error regestring user"
            
        },{
            status:500
        })

    }
}


