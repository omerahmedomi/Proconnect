import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref:'Profile',
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
  likes: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  comments: [
    {
      by: { type: Schema.Types.ObjectId, ref: "Profile" },
      comment: String,
      createdAt: {
        type:Date,
        default:Date.now
      }
    }
  ],
},{timestamps:true});


export default mongoose.models.Post  ||  mongoose.model("Post", postSchema);
