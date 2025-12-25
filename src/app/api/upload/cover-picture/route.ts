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
      const image = formData.get('coverImage') as File;
      console.log("FormData",formData)
  
      const {cid} = await pinata.upload.public.file(image);
      const url = await pinata.gateways.public.convert(cid);
      await dbConnect();
     const picture = await profile.findOneAndUpdate(new mongoose.Types.ObjectId(user2.user.id),{cover_picture:url},{new:true,upsert:true});
      // console.log("Picture")
      return NextResponse.json({
        sucess:"true",
        imagePath:picture,

      })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
        {error:"Error uplaoding picture",}
    )
    
  }

}