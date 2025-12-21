import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref:'User',
    required: true,
  
  },
  text: {
    type: String,
    trim: true,
    default:null,
  },
  images:{
    type: [String],
    default:[]
},
//   likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
//   comments: [
//     {
//       by: { type: Schema.Types.ObjectId, ref: "User" },
//       comment: String,
//     },
//   ],
},{timestamps:true});


export default mongoose.models.Post  ||  mongoose.model("Post", postSchema);
