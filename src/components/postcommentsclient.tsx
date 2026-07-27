"use client";

import { useOptimistic, startTransition, useState } from "react";
import { deleteCommentAction } from "@/app/actions/post";
import CommentMenu from "./commentmenu";
import ProfileImage from "./profileimage";
import { formatRelativeTime } from "@/utils/dateformat";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PostCommentsClient({
  comments,
  postId,
  postOwnerId,
  userProfileId,
}: { comments: any[]; postId: string; postOwnerId: string; userProfileId: string }) {
  const pathname = usePathname();
  const isSinglePostPage = pathname.startsWith(`/post/${postId}`);
  const [visibleCount, setVisibleCount] = useState(isSinglePostPage ? 10 : 3);

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
      {optimisticComments.slice(0, visibleCount).map((c) => (
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
      
      {optimisticComments.length > visibleCount && (
        <div className="mt-2 ml-2">
          {isSinglePostPage ? (
            <button
              onClick={() => setVisibleCount((prev) => prev + 10)}
              className="text-cyan-600 hover:underline hover:text-cyan-700 text-xs font-medium bg-transparent border-none p-0 cursor-pointer"
            >
              View more comments
            </button>
          ) : (
            <Link
              href={`/post/${postId}`}
              className="text-cyan-600 hover:underline hover:text-cyan-700 text-xs font-medium"
            >
              View more comments
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
