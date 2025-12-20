import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    trim: true,
  },
  images:{
    type: [String],
    default:[]
},
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      by: { type: Schema.Types.ObjectId, ref: "User" },
      comment: String,
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
