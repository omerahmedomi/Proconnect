import { requireAuth } from "@/lib/auth-middleware";
import { pinata } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import profile from "@/models/profile";

export async function POST(request:NextRequest){
  try {
      const user2 = await requireAuth(request);
      const formData = await request.formData();
      const image = formData.get('profileImage') as File;
      console.log(image)
  
      const {cid} = await pinata.upload.public.file(image);
      const url = await pinata.gateways.public.convert(cid);
      await dbConnect();
      await profile.findOneAndUpdate(new mongoose.Types.ObjectId(user2.user.id),{profile_picture:url},{new:true,upsert:true});
      
      return NextResponse.json({
        sucess:"true",
        imagePath:url,

      })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
        {error:"Error uplaoding picture",}
    )
    
  }

}