"use client"

import { handleToggleLikeAction } from "@/app/actions/post"
import { MessageCircleMore, Send, ThumbsUp } from "lucide-react"
import { useState } from "react"

export default function PostActivities({ post, userProfileId }) {

  const [likes, setLikes] = useState(post.likes)

  const liked = likes.some(id => id.toString() === userProfileId)

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

  return (
    <div className="flex flex-col mt-2 space-y-1">

      <div className="flex justify-between text-sm text-gray-500">
        <p>Liked by Umer and {likes.length} others</p>
        <div className="flex gap-1 items-center">
          <p>212 comments</p>
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

        <span>
          <MessageCircleMore size={17} />
          Comment
        </span>

        <span>
          <Send size={17} />
          Share
        </span>

      </div>
    </div>
  )
}