'use client';
import { verifySchema } from '@/Schemas/verifySchema';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { useParams, useRouter } from 'next/dist/client/components/navigation';
import { toast } from 'sonner';
import React from 'react'
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

function VerifyAccount() {
    const router = useRouter();
    const params = useParams();


       //zod implementation
        const form = useForm({
            resolver:zodResolver(verifySchema),
        })
        const onsubmit = async(data:z.infer<typeof verifySchema>)=>{
        try {
           const res = await axios.post('/api/verify-code',{
                username:params.username,
                code:data.verifyCode
            })

            toast.success(res.data.message)
            router.replace('/sign-in')

        } catch (error) {
            toast.error("Error Verifying Account")
            console.log("Error Verifying Account",error)


        }

    }

  return (
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
         <div
         className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
            <div className='text-center'>
                <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
                    Verify Your Account
                </h1>
            </div>
            <div>
                <Form {...form}>
                     <form onSubmit={form.handleSubmit(onsubmit)} className='space-y-6'>
                        {/* UserName */}
                        <FormField
                            name="verifyCode"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Verification Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Verification Code" {...field}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type='submit'>Verify</Button>


                     </form>
                     
                </Form>
            </div>

            <div className='items-center w-full text-center'>
                <p>Already a Member? <a href="/sign-in" className="text-blue-500 hover:underline">Sign In</a></p>
            </div>
         </div>

     </div>
  )
}

export default VerifyAccount