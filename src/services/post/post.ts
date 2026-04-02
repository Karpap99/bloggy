import { db } from "@/src/hooks/firebase/firebase"
import { Post, PostCreate, PostCreateSchema, PostUpdate, PostUpdateSchema } from "@/src/types/post"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"


export const addPost = async (post: PostCreate, author: { id: string, email: string }) => { 
    const parsed = PostCreateSchema.safeParse(post);

    if (!parsed.success) {
        throw new Error("Invalid post data");
    }
    const data = parsed.data;

    const postRef = await addDoc(collection(db, "posts"), { 
        ...data,
        author: author, 
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        views: 0,
        messagesAmount: 0,
    });

    return {
        id: postRef.id,
        ...data,
        author: author,
        views: 0,
        messagesAmount: 0,
    }
}


export const getPosts = async (sortedBy: "createdAt" | "views" | "messages") => {
    const postsRef = collection(db, "posts");
    const postsSnap = await getDocs(postsRef);

    const posts = postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
    if (sortedBy === "createdAt") {
        const sortedByDate = [...posts].sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime());
        return sortedByDate;
    }
    if (sortedBy === "views") {
        const sortedByViews = [...posts].sort((a, b) => b.views - a.views);
        return sortedByViews;
    }
    if (sortedBy === "messages") {
        const sortedByMessages = [...posts].sort((a, b) => b.messagesAmount - a.messagesAmount);
        return sortedByMessages;
    }
}


export const getPost = async (id: string) => {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
        updateDoc(postRef, { views: postSnap.data().views + 1 });
        return { id: postSnap.id, ...postSnap.data() } as Post;
    }
    return null;
}

export const updatePost = async (id: string, post: PostUpdate, userId: string) => {
    const parsed = PostUpdateSchema.safeParse(post);

    if (!parsed.success) {
        throw new Error("Invalid post data");
    }

    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
        throw new Error("Post not found");
    }
    if(postSnap.data().author.id !== userId) {
        throw new Error("Unauthorized");
    }
    await updateDoc(postRef, parsed.data);  
}


export const deletePost = async (id: string) => {
    const postRef = doc(db, "posts", id);
    await deleteDoc(postRef);
}