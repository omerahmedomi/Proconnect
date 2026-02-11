import mongoose from "mongoose";
import { Schema } from "mongoose";

const experienceSchema = new Schema(
  {
    profile: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      // required:true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      required: true,
    },
    startMonth: {
      type: Number,
      required: true,
    },
    endMonth: {
      type: Number,
      // required: true,
    },
    startYear: {
      type: Number,
      required: true,
    },
    endYear: {
      type: Number,
      // required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    locationType: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    current:{
      type:Boolean,
      default:false,
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Experience || mongoose.model("Experience",experienceSchema);
