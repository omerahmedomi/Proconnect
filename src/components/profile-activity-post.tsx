"use client";

import { Trash2, Pencil, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "./modal";
import { deletePost, updatePost } from "@/app/actions/post";
import DeleteButton from "./deletebutton";
import SaveButton from "./savebutton";

export default function ProfileActivityPost({ post, self }: { post: any; self: boolean }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (isEditModalOpen || isDeleteModalOpen)
      document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset" };
  }, [isEditModalOpen, isDeleteModalOpen]);
  return (
    <div className="shadow border-cyan-100 border-2 rounded-lg p-4 bg-white space-y-2 text-xs">
      <div className="flex justify-between items-start">
        <div className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>

        {/* management */}
        <div className="flex gap-1 *:cursor-pointer *:hover:bg-cyan-50 *:rounded-full *:p-2 transition">
          {self && (
            <button title="Edit" onClick={() => setIsEditModalOpen(true)}>
              <Pencil size={16} />
            </button>
          )}
          {self && (
            <button title="Delete" onClick={() => setIsDeleteModalOpen(true)}>
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      <p className=" text-left!">{post.text}</p>

      {post.images.length > 0 && (
        <img
          src={post.images[0]}
          className="max-h-80 object-cover"
          width={200}
          alt="post-image"
          height={200}
        />
      )}
      {isEditModalOpen && (
        <Modal
          title="Edit Post"
          content={
            <form className="w-full flex flex-col gap-y-2" action={updatePost}>
              <input
                type="text"
                placeholder="Update post text"
                name="text"
                className="w-full"
                defaultValue={post?.text}
              />
              <SaveButton />
            </form>
          }
          clearFunction={() => setIsEditModalOpen(false)}
          styles={"profile-modal-styles"}
        />
      )}
      {isDeleteModalOpen && (
        <Modal
          // title='Delete Post'
          content={
            <div className="flex flex-col items-center w-full gap-y-2">
              <div className="flex gap-1 items-center justify-center text-lg">
                <AlertTriangle className="text-red-700" />
                <span>Post Deletion Alert!</span>
              </div>
              <div className="flex flex-col items-center text-base gap-y-4">
                <p>Are you sure you want to delete the selected post?</p>
                <div className="flex gap-5">
                  <form action={deletePost.bind(null, post?._id)}>
                    <DeleteButton />
                  </form>
                  <button
                    className="btn-register rounded-sm"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          }
          clearFunction={() => setIsDeleteModalOpen(false)}
          styles={"top-1/4 bottom-1/3 max-w-100 "}
        />
      )}
      {(isDeleteModalOpen || isEditModalOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-45 cursor-pointer"
          onClick={() => {
            setIsEditModalOpen(false);
            setIsDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
