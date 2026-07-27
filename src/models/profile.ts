import mongoose, { Schema } from "mongoose";


const ProfileSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
    },
    name:{
        firstName:{
            type:String,
            default:null,
            trim:true,
        },
        lastName:{
            type:String,
            default:null,
            trim:true,
        }
    },
    skills:[String],
    industry:[String],
    headline:{
        type:String,
        trim:true,
    },
    school:{
        type:Schema.Types.ObjectId,
        ref:'Education'
    },

    position:{
        type:Schema.Types.ObjectId,
        ref:'Experience'
    },
    profile_picture:{
        type:String,
        default:null,

    },
    cover_picture:{
        type:String,
        default:null,
    },
    location:{
        country:{
            type:String,
            trim:true,
        },
        city:{
            type:String,
            trim:true,
        },
    },
    about:{
        type:String,
        trim:true,
        default:null,
    },
    
   connections:[{ type: Schema.Types.ObjectId, ref: 'Profile',}],
   savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
   connection_requests: [
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "ignored"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    ignoredAt: {
      type: Date,
      default: null,
    },
  },
],

},{
    timestamps:true,
})


if (mongoose.models.Profile) {
  delete mongoose.models.Profile;
}
export default mongoose.model("Profile", ProfileSchema);