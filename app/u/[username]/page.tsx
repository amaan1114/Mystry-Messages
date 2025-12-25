'use client'
import {zodResolver} from '@hookform/resolvers/zod'
import { messageSchema } from '@/Schemas/messageSchema'
import {useForm}  from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { useParams } from 'next/dist/client/components/navigation';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Card,CardContent } from '@/components/ui/card';
function messagePage() {
  const params = useParams();
  const [suggestedMessages,setSuggestedMessages] = useState<string[]>([])
  const [loading,setLoading] = useState(false)
  const form = useForm({
    resolver:zodResolver(messageSchema),
    defaultValues:{
      content:'',
    }
  }

  )

  const onSubmit = async (data:z.infer<typeof messageSchema>)=>{
    try{

       const res  = await axios.post('/api/send-messages',{
          username:params.username,
          content:data.content,
        })
        console.log(res)
        toast.success("Message sent successfully")
      

    }catch(err:any){
       if (err.response?.status === 403) {
          toast.error("User is not accepting messages");
        } else {
          toast.error("Error sending message");
        }

        console.log("Error sending message", err);
    }
   


  }  
  const SuggestMessage = async()=>{
    setLoading(true)
    try{
     const res = await fetch('/api/suggest-messages',
      {method:'POST'}
     );

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      let fullText = '';

      while (true) {
        const { value, done } = await reader!.read();
        if (done) break;

        fullText += decoder.decode(value, { stream: true });
      }

      setSuggestedMessages(fullText.split('||').filter(msg => msg.trim() !== ''));
     
    }catch(err){
      console.log("Error suggesting message",err)
      toast.error("Error suggesting message")
    }finally{
      setLoading(false)
      
    }
  }

  return (
    <div className='w-screen h-screen flex flex-col content-center items-center'>
      <div className='w-[90%] mt-20'>
        <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Enter your message"  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className='cursor-pointer'>Send</Button>
              </form>
        </Form>
      </div>
      <div className='w-[90%] mt-20'>
        <Button onClick={SuggestMessage} className='cursor-pointer' disabled={loading}>{loading ? (<><Loader2 className="w-5 h-5 animate-spin" /> Loading Messages...</>) : "Suggest Messages"}</Button>
        {
          suggestedMessages.length > 0 && (
            <div className='mt-10 flex flex-col gap-4'>
              <h2 className='text-2xl font-bold'>Suggested Messages:</h2>
              {
                suggestedMessages.map((msg,index)=>(
                  <Card key={index} className='hover:bg-gray-100 cursor-pointer' onClick={() => onSubmit({content: msg})}>
                    <CardContent>
                      <p>{msg}</p>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          )
        }
      </div>

    </div>
  )
}

export default messagePage