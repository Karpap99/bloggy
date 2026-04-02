'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Post } from "@/src/types/post";
import { addMessage, getPostMessages } from "@/src/services/message/message";
import { Message } from "@/src/components/message/message";
import { Message as MessageType } from "@/src/types/message";
import { useAppSelector } from "@/lib/hooks";
import { Publication } from "@/src/components/publication/publication";

export default function Post() {
    const { user, isAuthed } = useAppSelector(state => state.user);
    const path = usePathname();
    const id = path.split("/")[2];
    const [postMessages, setPostMessages] = useState<MessageType[]>([]);  


    useEffect(() => {        
        getPostMessages(id).then((messages) => {
            setPostMessages(messages);
        });
    }, [id])
    

    

    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const content = formData.get("message") as string;
        
        if(!isAuthed || !user) {
            alert("You must be logged in to send a message");
            return;
        }
        addMessage({ content }, { id: user.id, email: user.email }, id, "root").then(() => {
            getPostMessages(id).then((messages) => {
                setPostMessages(messages);
            });
            (e.target as HTMLFormElement).reset();
        }).catch((err) => {
            alert(err.message);
        });
        
    }
  return (
    <div className="w-[1440px] mx-auto p-2 flex-1">
        <Publication postId={id} />
        <div>
            <h3 className="text-3xl">Messages: </h3>
            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                <textarea placeholder="Your message" name="message" className="border border-gray-300 rounded-md p-2 w-full mb-4" rows={4} />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Send Message</button>
            </form>
            <div className="flex flex-col gap-4 mt-4">
                {
                    postMessages.map((message) => (
                        <Message key={message.id} message={message} />
                    ))  
                }
            </div>
        </div>
      

    </div>
  );
}
