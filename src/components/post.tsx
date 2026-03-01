import { Ellipsis,X,ThumbsUp,MessageCircleMore,Repeat2,Send } from "lucide-react";
import ProfileImage from "./profileimage";
import Connect from "./connect";
import { timeAgo } from './../utils/dateformat';
import Link from "next/link";
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
          <Link className="flex items-centr  gap-2" href={`/profile/${post?.profile?._id}`}>
            <ProfileImage styles={"w-14 h-14"} image={post?.profile?.profile_picture} imgStyles={''} />
            <div className="text-left! -space-y-0.5 mt-1 ">
              <h5 className="text-sm font-semibold">{post?.profile?.name?.firstName + " "+ post?.profile?.name?.lastName}</h5>
              <h5 className="text-xs line-clamp-1">{post?.profile?.headline}</h5>
              <h5 className="text-xs font-light">
                {timeAgo(post?.createdAt)}
              </h5>
            </div>
          </Link>
          <Connect profileId={post?.profile?._id?.toString()} userProfileId={userProfileId}/>
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

        <div className="flex flex-col mt-2 space-y-1">
          <div className="flex justify-between text-sm text-gray-500">
            <p>Liked by Umer and 5000 others </p>
            <div className="flex gap-1 items-center">
              <p>212 comments</p>
            </div>
          </div>
          <div className="w-full">
            <div className="h-px px-3  w-full bg-gray-400" />
          </div>
          <div className="flex justify-between text-sm text-gray-500 *:flex *:items-center *:gap-x-2 *:p-2 *:hover:bg-gray-200 *:cursor-pointer *:rounded transition-all duration-500">
            <span>
              <ThumbsUp size={17} />
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
      </div>
    );

}