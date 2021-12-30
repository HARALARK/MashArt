import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js"

// @desc user auth & get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (user && user.matchPassword(password)) {
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
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    res.status(400)
    throw new Error("Passwords dont match")
  }

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
// @route POST /api/users/username
// @access Public
export const checkUsername = asyncHandler(async (req, res) => {
  const { username } = req.body
  const usernameExists = await User.findOne({ username })
  if (usernameExists) {
    throw new Error("Username already Exists")
  }
})

// @desc check if email exists
// @route POST /api/users/email
// @access Public
export const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    throw new Error("Email already Exists")
  }
})
