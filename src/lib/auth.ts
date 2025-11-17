import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

import { MongoClient } from "mongodb";
console.log(process.env.MONGODB_URI)
const client = new MongoClient(process.env.MONGODB_URI!)

const db= client.db()
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret:process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
 socialProviders:{
  google:{
    clientId:process.env.GOOGLE_CLIENT_ID as string,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
  
    
  },
  github:{
    clientId:process.env.GITHUB_CLIENT_ID as string,
    clientSecret:process.env.GITHUB_CLIENT_SECRET as string
  }
 }
  
});