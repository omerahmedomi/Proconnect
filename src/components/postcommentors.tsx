import post from "@/models/post";
import ProfileImage from "./profileimage";
import { formatDistanceToNowStrict } from "date-fns";
import { formatRelativeTime } from "@/utils/dateformat";

export default async function PostCommentors({ postId }) {
  const userPost = await post.findById(postId).populate('comments.by')

  return (
    <div className="mt-2 space-y-1">
      {userPost.comments.sort((a, b) => b.createdAt - a.createdAt).map((c, i) => (
        <div key={i} className="text-xs bg-gray-100 p-2 rounded">
          <div className="flex items-start gap-x-2">
            <ProfileImage image={c.by.profile_picture} styles={"size-8"} />
            <div  className="w-full">
              <div className=" flex justify-between">
                <div className="flex flex-col mt-0.5">
                  <p className="text-xs font-semibold">
                    {c.by.name.firstName + " " + c.by.name.lastName}
                  </p>
                  <p className="text-[11px] text-gray-700">{c.by.headline}</p>
                </div>
                <div className="text-[10.5px] text-gray-700 mt-0.5 ">{formatRelativeTime(c.createdAt)}</div>
              </div>

              <div className='mt-1.5'>{c.comment}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
