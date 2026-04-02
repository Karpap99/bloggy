import { Timestamp } from "firebase/firestore";
import { z } from "zod";


export const PostCreateSchema = z.object({
    title: z.string().min(6),
    content: z.string().min(12),
});

export type PostCreate = z.infer<typeof PostCreateSchema>;

export const PostUpdateSchema = z.object({
    title: z.string().min(6).optional(),
    content: z.string().min(12).optional(),
});

export type PostUpdate = z.infer<typeof PostUpdateSchema>;


export type Post = {
    id: string;
    title: string;
    content: string;
    author: { id: string; email: string };
    messagesAmount: number;
    views: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}