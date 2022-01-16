import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js"

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
