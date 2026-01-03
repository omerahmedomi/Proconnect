'use server'

import { requireAuth } from "@/lib/auth-middleware"
import post from "@/models/post";
import { redirect } from "next/navigation";

export const deletePost= async()=>{
    const user = await requireAuth();
    await post.findOneAndDelete({user:user.user.id});
    redirect(`/profile/${user.user.id}`)
    
    
}