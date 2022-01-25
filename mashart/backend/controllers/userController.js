import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js"
import { getTransporter } from "../utils/emailSetup.js"

// @desc user auth & get token
// @route POST /api/user/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid username or password")
  }
})

// @desc register new user
// @route POST /api/user
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  const userExists =
    (await User.findOne({ username })) || (await User.findOne({ email }))

  if (userExists) {
    res.status(400)
    throw new Error("User already Exists")
  }

  const user = await User.create({
    username,
    email,
    password,
  })

  if (user) {
    res.status(200)
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc check if usename exists
// @route POST /api/user/username
// @access Public
export const checkUsername = asyncHandler(async (req, res) => {
  const { username } = req.body
  const usernameExists = await User.findOne({ username })
  if (usernameExists) {
    throw new Error("Username already Exists")
  }
  res.json({
    username,
  })
})

// @desc check if email exists
// @route POST /api/user/email
// @access Public
export const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    throw new Error("Email already Exists")
  }
  res.json({
    email,
  })
})

// @desc get user profile
// @route GET /api/user/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc update user profile
// @route POST /api/user/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  const user = await User.findById(req.user._id)

  if (user) {
    user.username = username || user.username
    user.email = email || user.email

    if (password) {
      user.password = password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      usename: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc send email to the user for the reset link
// @route PUT /api/user/forgot-password
// @access Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error("User doesnt exist")
  }

  const token = generateToken(
    user._id,
    "15m",
    process.env.RESET_LINK_JWT_SECRET
  )
  // setup e-mail data, even with unicode symbols
  const mailOptions = {
    from: `"MashArt" <${process.env.EMAIL}>`, // sender address (who sends)
    to: email, // list of receivers (who receives)
    subject: "Password Reset Link", // Subject line
    html: `<b>Hi ${user.username} </b>
    <br> 
    <p>Your Password Reset Link:  
    <a href='http://localhost:3000/reset-password/${token}'>
    http://localhost:3000/reset-password/${token}
    </a>
    <br>
    This link is only valid for the next 15 minutes.
    </p>
    <br>
    Thank You
    <br>
    MashArt
    `, // html body
  }

  const transporter = getTransporter()
  transporter.sendMail(mailOptions, async (err, info) => {
    if (err) {
      res.status(500)
      throw new Error(err.message)
    }

    user.resetLink = token
    await user.save()

    res.status(200)
    res.json({
      message: "Reset link has been sent to your email.(valid for 15min)",
    })
  })
})

// @desc send email to the user for the reset link
// @route PUT /api/user/reset-password
// @access Private
export const resetPassword = asyncHandler(async (req, res) => {
  const { password, resetLink } = req.body

  if (!resetLink) {
    res.status(401)
    throw new Error("Authentication Error!")
  }

  jwt.verify(resetLink, process.env.RESET_LINK_JWT_SECRET)

  const user = await User.findOne({ resetLink })

  if (!user) {
    res.status(404)
    throw new Error("User with this token does not exist.")
  }

  user.password = password
  user.resetLink = ""
  await user.save()

  res.json({
    message: "Password has been changed successfully",
  })
})

// @desc search for users using their username
// @route GET /api/user/search
// @access Private
export const searchUser = asyncHandler(async (req, res) => {
  const { username } = req.body

  const users = await User.find(
    { username: { $regex: username } },
    { username: 1 }
  )

  res.json({
    users,
  })
})
