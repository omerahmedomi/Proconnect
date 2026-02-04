import mongoose, { Schema } from "mongoose";

const educationSchema = new Schema({
  profile: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  school: {
    type: String,
    required: true,
    trim: true,
  },
  degree: {
    type: String,
    enum: ["Bachelors", "Masters", "Phd", "Diploma"],
    trim: true,
    // required: true,
  },
  field: {
    type: String,
    // requried: true,
    trim: true,
  },
  startMonth: {
    type: Number,
    // required: true,
  },
  endMonth: {
    type: Number,
    // required: true,
  },
  startYear: {
    type: Number,
    // required: true,
  },
  endYear: {
    type: Number,
    // required: true,
  },
  description:{
    type:String,
    trim:true,
  }
},{timestamps:true});

export default mongoose.models.Education || mongoose.model("Education",educationSchema);