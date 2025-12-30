import mongoose, { Schema } from "mongoose";import { headers } from "next/headers";


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
    industry:[String],
    headline:{
        type:String,
        trim:true,
    },
    school:String,
    position:String,
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
   connections:[{ type: Schema.Types.ObjectId, ref: 'User' }],

},{
    timestamps:false,
})



export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);