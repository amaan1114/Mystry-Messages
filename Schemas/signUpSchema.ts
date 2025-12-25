import {z} from "zod";

export const usernameValidation = z
    .string()
    .min(2,"User must be at least 2 characters")
    .max(30,"Username must be at most 30 characters")

export const signUPSchema = z.object({
    username: usernameValidation,
    email:z.string().email("Invalid email address"),
    password:z.string().min(6,"Password should contain minimum 6 characters")
    
})