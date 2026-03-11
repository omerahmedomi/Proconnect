"use client";

import { useOptimistic, startTransition } from "react";
import { deleteCommentAction } from "@/app/actions/post";
import CommentMenu from "./commentmenu";
import ProfileImage from "./profileimage";
import { formatRelativeTime } from "@/utils/dateformat";
import Link from "next/link";

export default function PostCommentsClient({
  comments,
  postId,
  postOwnerId,
  userProfileId,
}) {
  const [optimisticComments, removeComment] = useOptimistic(
    comments,
    (current, commentId: string) => current.filter((c) => c._id !== commentId),
  );

  function handleDelete(commentId: string) {
    removeComment(commentId);

    startTransition(async () => {
      await deleteCommentAction(postId, commentId, userProfileId);
    });
  }

  return (
    <div className="mt-2">
      {optimisticComments.map((c) => (
        <div key={c._id} className="group text-xs p-2 rounded hover:bg-gray-50">
          <div className="flex items-start gap-x-2">
            <ProfileImage image={c.by.profile_picture} styles={"size-8"} />

            <div className="w-full">
              <div className="flex justify-between">
                <Link href={`/profile/${c.by._id}`}>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold">
                      {c.by.name.firstName} {c.by.name.lastName}
                    </p>

                    <p className="text-[11px] text-gray-700">{c.by.headline}</p>
                  </div>
                </Link>

                <div className="flex items-center gap-1 text-[10.5px] text-gray-700">
                  {(c.by._id === userProfileId ||
                    postOwnerId === userProfileId) && (
                    <CommentMenu onDelete={() => handleDelete(c._id)} />
                  )}

                  <span>{formatRelativeTime(c.createdAt)}</span>
                </div>
              </div>

              <div className="mt-1.5">{c.comment}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
