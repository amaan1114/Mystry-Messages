"use client"
import React from 'react'
import Link from 'next/link'
import { useSession,signOut} from 'next-auth/react'
import {User} from 'next-auth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { LogIn } from 'lucide-react'




function navbar() {
    const {data:session} = useSession()
    const user = session?.user


    return (
        <nav>
            <div className='p-6 flex flex-row justify-between'>
                <a href="/" className='font-bold'>Mystery Message</a>
                {
                    session?(
                    <>
                    <span>Welcome {user?.username}</span>
                    <Button className='cursor-pointer' onClick={()=>signOut()}><LogOut className='w-6 h-6'/>LogOut</Button>
                    </>):(
                        <Link href="/sign-in ">
                            <Button className='cursor-pointer'><LogIn className='w-6 h-6' />LogIn</Button>
                        </Link>
                        
                    )
                }
            </div>
        </nav>
  )
}

export default navbar