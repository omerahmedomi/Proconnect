'use server'

import { requireAuth } from "@/lib/auth-middleware"
import post from "@/models/post";
import profile from "@/models/profile";
import { redirect } from "next/navigation";

export const deletePost= async(id:any)=>{
    const user = await requireAuth();
    const userProfile = await profile.findOne({user:user.user.id})
    console.log(userProfile);
    await post.findOneAndDelete({profile:userProfile._id,_id:id});
    redirect(`/profile/${userProfile._id}`)
    

}

export const updatePost=async(formData:FormData)=>{
    const user = await requireAuth();
     const userProfile = await profile.findOne({user:user.user.id})
    const text= formData.get("text");

    await post.findOneAndUpdate({profile:userProfile._id},{text});
    redirect(`/profile/${userProfile._id}`);

}