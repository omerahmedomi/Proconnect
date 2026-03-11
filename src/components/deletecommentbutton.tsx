"use client";

import { deleteCommentAction } from "@/app/actions/post";

export default function DeleteCommentButton({
  postId,
  commentId,
  userProfileId,
}) {
  async function handleDelete() {
    await deleteCommentAction(postId, commentId, userProfileId);
  }

  return (
    <button onClick={handleDelete} className="text-red-500 text-[11px]">
      Delete
    </button>
  );
}
