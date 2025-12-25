import z from "zod";
export const signInSchema = z.object({
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"password must be atleast 6 characters")
    
})