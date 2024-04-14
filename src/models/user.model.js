import { Schema, mongoose } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      require: true,
    },
    fullName: {
      type: String,
      lowercase: true,
      require: true,
    },
    dateOfBirth: {
      type: Date,
      require: true,
    },
    device: {
      type: String,
    },
    inGameRole: {
      type: String,
      enum: ["igl", "assaulter", "supporter"],
    },
    achievement: {
      type: String,
    },
    headShotRate: { type:String },
    totalMatch: { type:String },
    top10: { type:String },
    wins: { type:String },
    KDRating: { type:String },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
