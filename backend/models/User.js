import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
    name: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
