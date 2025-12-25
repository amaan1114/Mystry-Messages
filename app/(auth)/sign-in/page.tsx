 'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signInSchema } from '@/Schemas/signInSchema';
import { signIn } from 'next-auth/react';


 function signin() {

  const [isSubmitting,setisSubmitting] = useState(false)
  const router = useRouter();


    //zod implementation
    const form = useForm({
        resolver:zodResolver(signInSchema),
        defaultValues:{
            email:'',
            password:''
        }
    })




    const onSubmit = async (data:z.infer<typeof signInSchema>)=>{
      const result = await signIn('credentials',{
          redirect:false,
          email:data.email,
          password:data.password,
      })
      console.log(result)
      if(result?.error){
        toast.error('Invalid email or password')
      }
      if(result?.url){
        router.replace('/dashboard')
      }

    }

   return (
     <div className='flex justify-center items-center min-h-screen bg-gray-100'>
         <div
         className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
            <div className='text-center'>
                <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
                    Join Mystery Message
                </h1>
                <p className='mb-4'>
                    Sign In to start your anonymous messaging journey!
                </p>

            </div>
            <div >
                <Form {...form}>
                      {/* Email */}
                      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email"  {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Password */}
                         <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">SignIn</Button>
                       
                      </form>
                     
                     
                </Form>
                <div className='items-center w-full text-center'>
                    <p>Create New Account <a href="/sign-up" className="text-blue-500 hover:underline">Sign Up</a></p>
                </div>
            </div>
         </div>

     </div>
   )
 }
 
 export default signin