import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const MessageCreateSchema = z.object({
    content: z.string().min(5).max(500),
});

export type MessageCreate = z.infer<typeof MessageCreateSchema>;


export type Message = {
    id: string;
    postId: string;
    author: { id: string; email: string };
    content: string;
    parentNodeId?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}