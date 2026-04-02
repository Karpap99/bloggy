'use client';

import { getPosts } from "@/src/services/post/post";
import { Post } from "@/src/types/post";
import { useEffect, useState } from "react";
import PublicationShortcut from "../publicationShortcut/publicationShortcut";

export const PublicationList = () => {
    const [publications, setPublications] = useState<Post[]>([]);
    const [sortBy, setSortBy] = useState<"createdAt" | "views" | "messages">("createdAt");

    useEffect(() => {
        getPosts(sortBy).then((posts) => {
            if (!posts) {
                alert("No posts found");
                return;
            }
            setPublications(posts);
        }).catch((err) => {
            alert("Error: " + err.message);
        });
    }, [sortBy]);


    return (
        <div>
            <select className="border border-gray-300 rounded-md p-2 mb-4" onChange={(e) => {
                setSortBy(e.target.value as "createdAt" | "views");
            }}>
                <option value="createdAt">Sort by Date</option>
                <option value="views">Sort by Views</option>
                <option value="messages">Sort by Messages</option>
            </select>
           <li className="flex flex-col gap-4">
            {
                publications.map((post) => (
                    <PublicationShortcut key={post.id} post={post} />
                ))}
            </li>
        </div>
    )
}