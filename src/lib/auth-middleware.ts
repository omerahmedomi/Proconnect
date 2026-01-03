import { NextRequest } from "next/server";
import { auth } from "./auth";
import { headers } from "next/headers";




export async function requireAuth(request?:NextRequest){
  let session;
  if (request)
   {
    session = await auth.api.getSession({
     headers: request.headers,
   });
   }
   else{
    session = await auth.api.getSession({
      headers: await headers()
    })
   }
   if(!session) throw new Error('Unauthorized');
   return session;
}
