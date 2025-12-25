import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = 'edge';

export async function POST(request: Request) {

 try {
     const prompt = "Create a list of three short, funny, casual anonymous messages as if one friend is teasing or joking with another friend. Separate each message using '||'."
   
     const result = await streamText({
       model: openai("openai/gpt-oss-20b"),
       maxOutputTokens:500,
       prompt,
     });
   
     return result.toTextStreamResponse()

 } catch (error) {
    console.log("Error is suggesting message:",error)

    return Response.json({
        success:false,
        message:"Internal Server Error"
    },
    {status:500})
 }
}

