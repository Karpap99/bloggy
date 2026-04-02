"use client";

import { Post } from "@/src/types/post";
import { useRouter } from "next/navigation";


type Props = {
    post: Post;
};

export default function PublicationShortcut({ post }: Props) {
    const router = useRouter();
    
    const handleClick = () => {
        router.push(`/post/${post.id}`);
    }

  return (
    <section className="border border-gray-300 rounded p-4 cursor-pointer h-[200px] w-full flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-pretty overflow-hidden" onClick={handleClick} >{post.title}</h2>
        <p className="h-[60%] line-clamp-4 text-pretty overflow-hidden break-all" onClick={handleClick} >{post.content}</p>
        <hr className="my-2" />
        <div className="flex justify-between items-center">
            <div className="flex gap-4">
                <p> {post.messagesAmount} messages</p>
                <p> {post.views} views</p>
            </div>
            <div className="flex gap-4">
                <p>By: {post.author?.email || 'Unknown Author'}</p>
                <p>
                    {
                        post.createdAt.toDate().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",

                    })
                    }
                </p>
            </div>
            
        </div>
        
    </section>
  );
}