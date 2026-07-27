import PostCommentsClient from "./postcommentsclient";

export default function PostCommentors({ postId, userProfileId, postComments, postOwnerId }) {
  const comments = postComments?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

  return (
    <PostCommentsClient
      comments={comments}
      postId={postId.toString()}
      postOwnerId={postOwnerId}
      userProfileId={userProfileId}
    />
  );
}
