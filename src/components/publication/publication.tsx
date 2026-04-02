"use client";

import { useAppSelector } from "@/lib/hooks";
import { deletePost, getPost, updatePost } from "@/src/services/post/post";
import { Post } from "@/src/types/post";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Prop = {
  postId: string;
};

export const Publication = ({ postId }: Prop) => {
  const [post, setPost] = useState<Post | null>(null);
  const { user, isAuthed } = useAppSelector((state) => state.user);
  const [titleInput, setTitleInput] = useState(post?.title || "");
  const [contentInput, setContentInput] = useState(post?.content || "");
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getPost(postId)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  }, []);

  const handleSave = () => {
    const payload: Partial<Pick<Post, "title" | "content">> = {};
    if (titleInput !== post?.title) payload.title = titleInput;
    if (contentInput !== post?.content) payload.content = contentInput;
    console.log(payload);
    updatePost(postId, payload, user!.id)
      .then(() => {
        setPost({ ...post!, ...payload });
        setEditMode(false);
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  const handleCancel = () => {
    setTitleInput(post?.title || "");
    setContentInput(post?.content || "");
    setEditMode(false);
  };

  const handleDelete = () => {
    deletePost(postId).then(() => {
      router.push("/");
    }).catch((err) => {
        alert("Error: " + err.message);
    });
  
  }

  return (
    <div>
      <div className="w-full flex justify-end gap-4 mb-4">
        {isAuthed &&
          user?.id === post?.author?.id &&
          (editMode ? (
            <>
              <button
                className="bg-green-500 text-white px-2 py-2 rounded-md cursor-pointer"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-2 py-2 rounded-md cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-500 text-white px-2 py-2 rounded-md cursor-pointer"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-2 rounded-md cursor-pointer" onClick={handleDelete}>
                Delete
              </button>
            </>
          ))}
      </div>
      {!editMode ? (
        <h2 className="text-4xl font-bold text-pretty break-all">
          {post?.title}
        </h2>
      ) : (
        <input
          name="title"
          className="text-4xl font-bold text-pretty break-all w-full border border-gray-300 rounded-md p-2"
          defaultValue={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
      )}
      <hr />
      <div className="flex justify-between items-center">
        <p>By: {post?.author?.email || "Unknown Author"}</p>
        <p>
          Created:{" "}
          {post?.createdAt
            ? post.createdAt.toDate().toLocaleDateString()
            : "Unknown Date"}
        </p>
      </div>
      <br></br>
      {!editMode ? (
        <p className="text-2xl text-pretty break-all">{post?.content}</p>
      ) : (
        <textarea
          name="content"
          className="text-2xl text-pretty break-all w-full border border-gray-300 rounded-md p-2"
          defaultValue={contentInput}
          onChange={(e) => setContentInput(e.target.value)}
        />
      )}
      <hr />
      <div className="flex items-center gap-4">
        <p>Views: {post?.views || 0}</p>
      </div>
      <br />
    </div>
  );
};
