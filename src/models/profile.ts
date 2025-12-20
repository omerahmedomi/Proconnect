import mongoose, { Schema } from "mongoose";import { headers } from "next/headers";


const ProfileSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,

        
    },
    name:{
        firstName:{
            type:String,
            default:null,
        },
        lastName:{
            type:String,
            default:null,
        }
    },
    industry:[String],
    headline:String,
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

const Profile = mongoose.model('Profile',ProfileSchema);

export default Profile;