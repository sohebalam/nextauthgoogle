import catchAsyncErrors from "../middlewares/catchAsyncErrors"
import User from "../models/userModel"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendEmail } from "../middlewares/sendMail"

export const registerUser = catchAsyncErrors(async (req, res) => {
  // console.log(req.body)

  const { name, email, password } = req.body

  const userExists = await User.findOneAndReplace({ email })

  if (userExists) {
    return res.status(400).json({ message: "user exists" })
  }

  const salt = await bcrypt.genSalt(12)
  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, salt),
  })

  res.status(200).json({
    success: true,
    message: "Account Registered successfully",
  })
})

export const currentUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id)
  res.status(200).json({
    success: true,
    user,
  })
})

export const updateProfile = async (req, res) => {
  console.log(req.user._id)
  const user = await User.findById(req.user._id)

  if (user) {
    ;(user.name = req.body.name), (user.email = req.body.email)
    if (req.body.password) {
      user.password = req.body.password
    }
  }
  await user.save()
  res.status(200).json({
    success: true,
  })
}

export const forgotPassword = async (req, res) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" })
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })

    user.resetToken = token
    console.log(user)
    await user.save()

    const link = `${process.env.API}/user/reset/${token}`
    // HTML Message
    const message = `
      
      <div>Click the link below to reset your password or if the link is not working, please paste it into your browser</div><br/>
      <div>${link}</div>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      })

      res.status(200).json({
        message: `Email Sent to ${user.email}, please check your email`,
      })
    } catch (err) {
      console.log(err)

      user.resetToken = undefined
      // user.resetPasswordExpire = undefined

      await user.save()

      return res.status(500).json({ messsage: "Email could not be sent" })
    }
  } catch (error) {
    console.log(error)
  }
}

export const resetPassword = async (req, res) => {
  // const { resetToken } = req.body
  const { resetToken } = req.query
  // we can pass through params aswell

  if (resetToken) {
    // token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET)
    req.user = decoded
  }

  try {
    const user = await User.findById(req.user._id)

    if (user) {
      const salt = await bcrypt.genSalt(10)
      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, salt)
      }
      user.resetToken = undefined
      await user.save()
      return res.status(200).json({
        message: `success in updating user`,
      })
    }
  } catch (error) {
    res.status(500)
    throw new Error("Server Error")
  }
}
