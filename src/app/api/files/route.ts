import { requireAuth } from "@/lib/auth-middleware";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/post";
import { pinata } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    console.log('User for auth', user)
    const formData = await request.formData();
    const images = formData.getAll("images") as File[];

    if (!images.length) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    // ✅ upload all images properly
    const uploaded = await Promise.all(
      images.map(async (image) => {
        const res = await pinata.upload.public.file(image);
        return res;
      })
    );

    // depending on SDK response shape
    const urls = await Promise.all(uploaded.map(
      async (item) => {
        const url = await pinata.gateways.public.convert(item.cid);
        return url
      }
    ),
);    
    await  dbConnect();

   const addURLstoDB = await Post.create({
     user: user?.user?.id,
     images: urls,
   });
   console.log("Add to db",addURLstoDB);


    return NextResponse.json( {urls, status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
