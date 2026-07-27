"use server";

import dbConnect from "@/lib/mongodb";
import profile from "@/models/profile";

export async function searchProfilesAction(query: string) {
  if (!query || query.trim().length === 0) {
    return [];
  }
  
  await dbConnect();
  
  const regex = new RegExp(query.trim(), "i");
  
  try {
    const results = await profile.find({
      $or: [
        { "name.firstName": regex },
        { "name.lastName": regex },
        { headline: regex }
      ]
    })
    .limit(5)
    .lean();
    
    return JSON.parse(JSON.stringify(results));
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
