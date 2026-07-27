"use client"

import { handleToggleLikeAction,addCommentAction } from "@/app/actions/post"
import { MessageCircleMore, Send, ThumbsUp } from "lucide-react"
import { useState } from "react"
import PostCommentors from "./postcommentors"
import { LineWave } from "react-loader-spinner"
import { toast } from "sonner"

export default function PostActivities({ post, userProfile }) {
  const userProfileId = userProfile?._id?.toString();
  const [likes, setLikes] = useState(post.likes)

  const liked = likes.some(id => id.toString() === userProfileId)
  const [isCommentSectionVisible,setIsCommentSectionVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [isCommenting,setIsCommenting] = useState(false);

  async function handleToggleLike(postId, profileId) {

    // optimistic update
    setLikes(prev => {
      const alreadyLiked = prev.some(id => id.toString() === profileId)

      if (alreadyLiked) {
        return prev.filter(id => id.toString() !== profileId)
      } else {
        return [...prev, profileId]
      }
    })

    try {
      await handleToggleLikeAction(postId, profileId)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleAddComment() {
    if (!commentText.trim()) return;

    const newComment = {
      _id: Math.random().toString(),
      by: userProfile,
      comment: commentText,
      createdAt: new Date().toISOString(),
    };

    // optimistic UI
    setComments((prev) => [...prev, newComment]);
    setCommentText("");

    try {
      setIsCommenting(true)
      await addCommentAction(post._id, userProfileId, commentText);
    } catch (err) {
      console.error(err);
    } finally{
      setIsCommenting(false)
    }
  }
  return (
    <div className="flex flex-col mt-2 space-y-1">
      <div className="flex justify-between text-sm text-gray-500">
        <p>
          {liked 
            ? `Liked by you ${likes.length - 1 > 0 ? `and ${likes.length - 1} others` : ''}`
            : `${likes.length} ${likes.length === 1 ? 'Like' : 'Likes'}`
          }
        </p>
        <div className="flex gap-1 items-center">
          <p>{comments.length > 0 ? comments.length == 1 ? '1 comment': `${comments.length} comments`:''}</p>
        </div>
      </div>

      <div className="w-full">
        <div className="h-px px-3 w-full bg-gray-400" />
      </div>

      <div className="flex justify-between text-sm text-gray-500 *:flex *:items-center *:gap-x-2 *:p-2 *:hover:bg-gray-200 *:cursor-pointer *:rounded transition-all duration-500">
        <span onClick={() => handleToggleLike(post._id, userProfileId)}>
          <ThumbsUp size={17} fill={liked ? "cyan" : "none"} />
          Like
        </span>

        <span onClick={() => setIsCommentSectionVisible(true)}>
          <MessageCircleMore size={17} />
          Comment
        </span>

        <span onClick={() => {
          const url = `${window.location.origin}/post/${post._id}`;
          navigator.clipboard.writeText(url).then(() => {
            toast.success("Post URL copied to clipboard!");
          }).catch(() => {
            toast.error("Failed to copy URL");
          });
        }}>
          <Send size={17} />
          Share
        </span>
      </div>
      {isCommentSectionVisible && (
        <div className="flex flex-col">
          <div className='flex gap-2 mt-2'>
            <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="border rounded-full px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 transition-all ring-cyan-700"
          />

          <button
            disabled={isCommenting}
            onClick={handleAddComment}
            className="text-sm bg-cyan-500 hover:bg-cyan-400 transition-colors hover:cursor-pointer text-white px-3 rounded-full disabled:bg-gray-200 disabled:text-gray-400 flex justify-center items-center disabled:cursor-not-allowed"
          >
            {isCommenting ? <span className='mx-auto w-fit max-w-7 flex justify-center items-center'><LineWave height='30'/></span>:'Post'}
          </button>
          </div>
          <PostCommentors 
            postId={post._id} 
            userProfileId={userProfileId} 
            postComments={comments} 
            postOwnerId={post.profile._id?.toString() || post.profile.toString()} 
          />
        </div>
      )}
    </div>
  );
}