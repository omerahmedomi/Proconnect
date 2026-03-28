import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },

    type: {
      type: String,
      enum: ["like", "comment", "connection_request", "connection_accepted"],
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
