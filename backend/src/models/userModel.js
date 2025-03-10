import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user", // Default role is "user"
    },
  },
  { timestamps: true } // Correct placement of timestamps option
);

export default mongoose.model("User", userSchema); // Correctly defining the model
