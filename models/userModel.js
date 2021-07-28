import mongoose from "mongoose"
import validator from "validator"

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Your password must be at least 6 characters"],
    select: false,
  },
  //   role: {
  //     type: String,
  //     default: "user",
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetToken: {
    type: String,
    default: "",
  },
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
