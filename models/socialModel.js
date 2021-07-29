import mongoose from "mongoose"
import validator from "validator"

const socialSchema = mongoose.Schema({
  socialId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    minLength: [6, "Your password must be at least 6 characters"],
    select: false,
  },
  //   role: {
  //     type: String,
  //     default: "social",
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

const Social = mongoose.models.Social || mongoose.model("Social", socialSchema)

export default Social
