import post from "@/models/post";
import PostCommentsClient from "./postcommentsclient";

export default async function PostCommentors({ postId, userProfileId }) {
  const userPost = await post.findById(postId).populate("comments.by");

  const comments = userPost.comments.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <PostCommentsClient
      comments={JSON.parse(JSON.stringify(comments))}
      postId={postId}
      postOwnerId={userPost.profile.toString()}
      userProfileId={userProfileId}
    />
  );
}
