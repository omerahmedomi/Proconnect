import { Ellipsis,X,ThumbsUp,MessageCircleMore,Send } from "lucide-react";
import ProfileImage from "./profileimage";
import Connect from "./connect";
import { timeAgo } from './../utils/dateformat';
import Link from "next/link";
import PostActivities from "./postactivities";
import PostCommentors from "./postcommentors";
import { Prosto_One } from "next/font/google";
export default async function Post({post,userProfileId}){
   
    return (
      <div className="sm:rounded-lg border border-gray-200 *:px-3 py-3  w-full bg-white ">
        <div className="header-post flex justify-between text-xs ">
          <p className="">
            <span className="font-bold">Umer</span> likes this
          </p>
          <div className="flex gap-2 text-gray-600 hover:text-gray-500 *:cursor-pointer">
            <Ellipsis />
            <X />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link
            className="flex items-centr  gap-2"
            href={`/profile/${post?.profile?._id}`}
          >
            <ProfileImage
              styles={"w-14 h-14"}
              image={post?.profile?.profile_picture}
              imgStyles={""}
            />
            <div className="text-left! -space-y-0.5 mt-1 ">
              <h5 className="text-sm font-semibold">
                {post?.profile?.name?.firstName +
                  " " +
                  post?.profile?.name?.lastName}
              </h5>
              <h5 className="text-xs line-clamp-1">
                {post?.profile?.headline}
              </h5>
              <h5 className="text-xs font-light">{timeAgo(post?.createdAt)}</h5>
            </div>
          </Link>
          <Connect
            profileId={post?.profile?._id?.toString()}
            userProfileId={userProfileId}
          />
        </div>
        <div className="mt-2 text-sm">{post?.text}</div>
        {post?.images?.length > 0 && (
          <div className="post-image mt-3 p-0!">
            <img
              src={post?.images[0]}
              alt="post-img "
              className="w-full h-full max-w-full"
            />
          </div>
        )}

        <PostActivities
          post={JSON.parse(JSON.stringify(post))}
          userProfileId={userProfileId}
        >
          <PostCommentors postId={post._id} userProfileId={userProfileId} />
        </PostActivities>
      </div>
    );

}