'use client'
import { set } from "mongoose";
import { useCallback, useEffect, useState } from "react"; 
import { Message } from "@/model/User";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { acceptMessageSchema } from "@/Schemas/acceptMessageSchema";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2, RefreshCcw } from "lucide-react";
import MessageCard from "@/components/messageCard";

import { toast } from "sonner";
import { User } from "next-auth";

function dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading,setIsLoading] = useState(false);
  const [isSwitchLoading,setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId:string)=>{
    setMessages(messages.filter((message)=>message._id.toString() !== messageId))
  }

  const {data:session} = useSession();

  const form = useForm({  
    resolver:zodResolver(acceptMessageSchema),

  })
  const {register,watch,setValue}=form;
  const acceptMessage = watch('acceptMessage');

  const fetchAcceptMessage = useCallback(async()=>{
    setIsSwitchLoading(true);
    try{
      const res=await axios.get('/api/accept-messages')
      setValue('acceptMessage',res.data.isAcceptingMessage);
      setIsSwitchLoading(false);
    }catch(err){
      console.log(err)
      toast.error('Failed to fetch accept message setting')
    }finally{
      setIsSwitchLoading(false);
    }

  },[setValue])

  const fetchMessages = useCallback(async(refresh:boolean=false)=>{
    setIsLoading(true);
    setIsSwitchLoading(false)
    try{
     const res =  await axios.get('/api/get-messages')
      setMessages(res.data.messages || []);
      if(refresh){
        toast.success("Showing latest messages")
      }

    }catch(err){
      console.log(err)
      toast.error('Failed to fetch accept message setting')


    }finally{
      setIsLoading(false);
      setIsSwitchLoading(false);
    }

  },[setIsLoading,setIsSwitchLoading])

  useEffect(()=>{
    if(!session || !session.user){
      return;
    }
    fetchAcceptMessage();
    fetchMessages();
  },[session,setValue,fetchAcceptMessage,fetchMessages])


  const userName = session?.user.username
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${userName}`; 

  const copyToClipboard = ()=>{
    navigator.clipboard.writeText(profileUrl);
    toast.success('Profile URL copied to clipboard')

  }

  //handle switch change
  const handleSwitchChange = async()=>{
    try{
      const res =  await axios.post('/api/accept-messages',{
        acceptMessage:!acceptMessage
      })
      setValue('acceptMessage',!acceptMessage)
      toast.success(`You are now ${!acceptMessage?'accepting':'not accepting'} messages`) 
    }catch(err){
       console.log(err)
      toast.error('Failed to fetch accept message setting')

    }

    if(!session || !session.user){
      return <div>Please Login</div>
    }
  }

    return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessage')}
          checked={acceptMessage}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessage ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}

export default dashboard