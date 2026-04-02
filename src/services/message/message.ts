import { db } from "@/src/hooks/firebase/firebase"
import { Message, MessageCreate, MessageCreateSchema } from "@/src/types/message"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore"

export const addMessage = async (message: MessageCreate, user: { id: string; email: string }, postId: string, rootCommentId: 'root' | string) => { 
    const parsed = MessageCreateSchema.safeParse(message);

    if (!parsed.success) {
        throw new Error("Invalid message data");
    }

    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef); 
    if (!postSnap.exists()) {
        throw new Error("Post not found");
    }

    addDoc(collection(db, "messages"), { 
        ...parsed.data, 
        author: user, 
        postId: postId, 
        rootCommentId: rootCommentId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    })
    
    updateDoc(postRef, { messagesAmount: postSnap.data().messagesAmount + 1 });

    return message
}


export const getPostMessages = async (postId: string) => {
    const commentsRef = collection(db, "messages");
    const q = query(
            commentsRef,
            where("postId", "==", postId)
    );
    
    const querySnap = await getDocs(q);
    const messages = querySnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
    const sortedMessages = [...messages].sort(
  (a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
);

    return sortedMessages;
}


export const getComment = async (id: string) => {
    const commentRef = doc(db, "messages", id);
    const commentSnap = await getDoc(commentRef);
    if (commentSnap.exists()) {
        return { id: commentSnap.id, ...commentSnap.data() } as Message;
    }
    return null;
}

export const updateComment = async (id: string, comment : Partial<Message>, userId: string) => {
    const commentRef = doc(db, "messages", id);
    const commentSnap = await getDoc(commentRef);
    if (!commentSnap.exists()) {
        throw new Error("Comment not found");
    }
    if(commentSnap.data().authorId !== userId) {
        throw new Error("Unauthorized");
    }
    await updateDoc(commentRef, comment);  
}


export const deleteMessage = async (id: string) => {
    const messageRef = doc(db, "messages", id);
    await deleteDoc(messageRef);
}