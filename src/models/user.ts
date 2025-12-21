import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({}, {collection:'user'});

export default mongoose.models.User || mongoose.model("User", UserSchema);
