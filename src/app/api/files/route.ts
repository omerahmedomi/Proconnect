import { pinata } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
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
    // const urls = uploaded.map(
    //   (item) => item.gatewayUrl ?? item.ipfsUrl ?? item.cid
    // );

    return NextResponse.json( { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
