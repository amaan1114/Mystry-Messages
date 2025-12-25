import mongoose, {Document,Schema} from 'mongoose';

export interface Message extends Document{
    content:string,
    createdAt:Date
}

const MessageScheme:Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAccepting:boolean,
    messages:Message[]
}

const UserScheme:Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please provide a valid email address"]

    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:6

    },
    verifyCode:{
        type:String,
        required:true
    },

    verifyCodeExpiry:{
        type:Date,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAccepting:{
        type:Boolean,
        default:true
    },
    messages:[MessageScheme]
     
    


})

export const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserScheme));