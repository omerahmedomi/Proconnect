// // lib/mongodb.tsx
// import {MongoClient}  from 'mongodb'

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

// const clientPromise = client.connect();

// export const getDb = async () => {
// //   const c = await clientPromise;
//   return c.db(); // defaults to the DB name in the URI
// };
