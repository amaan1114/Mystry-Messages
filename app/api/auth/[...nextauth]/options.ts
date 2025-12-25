import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"email ",placeholder:"Enter your email"},
                password:{label:"Password",type:"password",placeholder:"Enter your password"}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect();
                try{
                    const user = await UserModel.findOne({
                        email:credentials.email
                    })
                    if(!user){
                        throw new Error("Invalid email or password")
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your email to login")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrect){
                        return user;

                    }else{
                        throw new Error("Invalid email or password")
                    }
                     
                }catch(error){
                    throw new Error("Internal server error");
                }



            }
        })
    ], 
    callbacks:{
        async session({session,token}){
            if(token){
                session.user._id = token._id 
                session.user.isVerified = token.isVerified
                session.user.isAccepting = token.isAccepting
                session.user.username = token.username
            }
            
            return session;
        },
        async jwt({token,user})
        {
            if(user){
                token._id = user._id?.toString(); 
                token.isVerified = user.isVerified;
                token.isAccepting = user.isAccepting;
                token.username = user.username;
            }

            return token

        }

    },
    pages:{
        signIn:"/sign-in"
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
}