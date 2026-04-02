'use client';

import { useAppSelector } from "@/lib/hooks";
import { addPost } from "@/src/services/post/post";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreatePost() {
    const router = useRouter();

    const { user, isAuthed } = useAppSelector(state => state.user);

    useEffect(() => {
        if (!isAuthed) {
            router.push("/auth");
        }
    }, [isAuthed]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        if(!user) {
            alert("User not authenticated");
            return;
        }

        addPost({ title, content }, { id: user.id, email: user.email}).then(() => {
            router.push("/");
        }).catch((err) => {
            alert("Error creating post: " + err.message);
        });
    }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex gap-4 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold">Create Post</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" name="title"  className="border border-gray-300 rounded-md p-2 w-full mb-4" />
            <textarea placeholder="Content" name="content" className="border border-gray-300 rounded-md p-2 w-full mb-4" rows={10} />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create</button>
        </form>
      </main>
    </div>
  );
}