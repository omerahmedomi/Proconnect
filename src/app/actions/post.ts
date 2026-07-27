"use server";

import { requireAuth } from "@/lib/auth-middleware";
import { sendNotification } from "@/lib/notificaionhelper";
import post from "@/models/post";
import profile from "@/models/profile";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deletePost = async (id: any) => {
  const user = await requireAuth();
  const userProfile = await profile.findOne({ user: user.user.id });
  console.log(userProfile);
  await post.findOneAndDelete({ profile: userProfile._id, _id: id });
  redirect(`/profile/${userProfile._id}`);
};

export const updatePost = async (formData: FormData) => {
  const user = await requireAuth();
  const userProfile = await profile.findOne({ user: user.user.id });
  const text = formData.get("text");

  await post.findOneAndUpdate({ profile: userProfile._id }, { text });
  redirect(`/profile/${userProfile._id}`);
};

export async function handleToggleLikeAction(
  postId: string,
  userProfileId: string,
) {
  console.log(postId, userProfileId);

  const userPost = await post.findById(postId);
  if (!userPost) throw new Error("Post not found");

  const alreadyLiked = userPost.likes.some(
    (id) => id.toString() === userProfileId,
  );

  if (alreadyLiked) {
    userPost.likes.pull(userProfileId);
  } else {
    userPost.likes.push(userProfileId);
  }

  await userPost.save();
  revalidatePath("/");
}

export async function fetchPostsAction(page: number, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;
    const postsDoc = await post
      .find()
      .populate("profile")
      .populate("comments.by")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    return JSON.parse(JSON.stringify(postsDoc));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export async function addCommentAction(
  postId: string,
  userProfileId: string,
  text: string,
) {
  if (!text.trim()) return;

  const userPost = await post.findById(postId);
  if (!userPost) throw new Error("Post not found");

  userPost.comments.push({
    by: userProfileId,
    comment: text,
  });

  await userPost.save();

  await sendNotification({type:'comment',recipientId:userPost.profile,senderId:userProfileId,postId:userPost._id})

  revalidatePath("/");
  return userPost.comments[userPost.comments.length - 1];
}

export async function deleteCommentAction(
  postId: string,
  commentId: string,
  userProfileId: string,
) {
  const userPost = await post.findById(postId);

  const comment = userPost.comments.id(commentId);

  if (!comment) throw new Error("Comment not found");

  const isCommentOwner = comment.by.toString() === userProfileId;

  const isPostOwner = userPost.profile.toString() === userProfileId;

  if (!isCommentOwner && !isPostOwner) {
    throw new Error("Unauthorized");
  }

  comment.deleteOne();

  await userPost.save();

  revalidatePath('/');
}

export async function toggleSavePostAction(postId: string, userProfileId: string) {
  const userProfile = await profile.findById(userProfileId);
  if (!userProfile) throw new Error("Profile not found");

  const alreadySaved = userProfile.savedPosts?.some(
    (id: any) => id.toString() === postId
  );

  if (alreadySaved) {
    userProfile.savedPosts.pull(postId);
  } else {
    if (!userProfile.savedPosts) {
      userProfile.savedPosts = [];
    }
    userProfile.savedPosts.push(postId);
  }

  await userProfile.save();
  revalidatePath("/");
}