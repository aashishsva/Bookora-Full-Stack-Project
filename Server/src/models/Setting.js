import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    businessName: String,
    ownerName: String,
    email: String,
    phone: String,
    address: String,
    currency: {
      type: String,
      default: "INR",
    },
    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },
    slotDuration: {
      type: String,
      default: "30",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);