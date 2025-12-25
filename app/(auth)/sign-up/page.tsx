 'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fa } from 'zod/locales';
import { useDebounceCallback } from 'usehooks-ts';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { signUPSchema } from '@/Schemas/signUpSchema';
import axios from 'axios';
import { cosineSimilarity } from 'ai';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

 function signup() {
    const [username,setUsername]=useState('')
    const [usernameMessage,SetUsernameMessage]=useState('')
    const [isCheckingUsername,setIsCheckingUsername]=useState(false)
    const [isSubmitting,setisSubmitting] = useState(false)
    const router = useRouter();
    const debouncedUsername = useDebounceCallback(setUsername,300)

    //zod implementation
    const form = useForm({
        resolver:zodResolver(signUPSchema),
        defaultValues:{
            username:'',
            email:'',
            password:''
        }
    })



    useEffect(()=>{
        const checkUsernameUnique = async()=>{
            if(username){
                setIsCheckingUsername(true)
                SetUsernameMessage('')
                try{
                   const res =  await axios.get(`/api/check-username-unique?username=${username}`)
                   SetUsernameMessage(res.data.message)

                }catch(error){
                    SetUsernameMessage("Error Checking Username")


                }finally{
                    setIsCheckingUsername(false)
                }
            }

        }
        checkUsernameUnique()
    },[username])

    const onSubmit = async (data:z.infer<typeof signUPSchema>)=>{
        setisSubmitting(true)
        try{
           const res = await axios.post('/api/sign-up',data)
           toast.success(res.data.message )
           router.replace(`/verify/${username}`)
        }catch(error){
            toast.error("Error Signing Up")
            console.log("Error Signing Up",error)

        }finally{
            setisSubmitting(false)
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
                    Sign up to start your anonymous messaging journey!
                </p>

            </div>
            <div>
                <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        {/* UserName */}
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="User name" {...field} 
                                    onChange={(e)=>{
                                        field.onChange(e)
                                        debouncedUsername (e.target.value)
                                    }}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
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

                        <Button type="submit" disabled={isSubmitting}
                        >{isSubmitting ? <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Signing Up...
                        </> : 'Sign Up'}
                        </Button>


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
 
 export default signup