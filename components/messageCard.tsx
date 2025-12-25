"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import axios from "axios";
import { toast } from "sonner";

type MessageCardProps = {
    message:Message,
    onMessageDelete:(messageID: string)=>void
}

function MessageCard({message,onMessageDelete}:MessageCardProps) {

    const handleDeleteConfirm = async () => {
       const res = await  axios.get(`/api/delete-message/?messageID=${message._id}`) 
       toast.success(res.data.message)
        onMessageDelete(message._id.toString())

    }


  return (

    <>
      <Card className="w-full md:w-[50%]">
        <CardHeader>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive"><X className="w-5 h-5"/></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>
        <CardContent>
          <p>{message.content}</p>
        </CardContent>
      </Card>
    </>
  );
}

export default MessageCard;
