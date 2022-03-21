import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js"
import { getTransporter } from "../utils/emailSetup.js"
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage"
import { storage } from "../config/firebase.js"

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
      role: user.role,
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
// @route GET /api/user/profile?_id=
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.query._id || req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      posts: user.posts,
      role: user.role,
      profileImage: user.profileImage || null,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc update user profile
// @route PUT /api/user/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const buffer = req.file ? req.file.buffer : null
  const { username, password } = req.body

  const user = await User.findById(req.user._id)

  if (user) {
    user.username = username || user.username

    if (buffer) {
      const extension = req.file.originalname.split(".").pop()

      const storageRef = ref(storage, `profile/${user._id}.${extension}`)
      const uploadTask = uploadBytesResumable(storageRef, buffer)

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          throw new Error(error)
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

          if (
            user.profileImage &&
            user.profileImage.ref &&
            user.profileImage.imageSrc
          ) {
            // Create a reference to the file to delete
            const oldProfileRef = ref(storage, user.profileImage.ref)

            // Delete the file
            deleteObject(oldProfileRef).catch((error) => {
              throw new Error(error)
            })
          }

          user.profileImage = {
            ref: storageRef.fullPath,
            imageSrc: downloadURL,
          }

          if (password) {
            user.password = password
          }

          const updatedUser = await user.save()

          res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: user.email,
            profileImage: updatedUser.profileImage,
            token: generateToken(updatedUser._id),
          })
        }
      )
    } else {
      if (password) {
        user.password = password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: user.email,
        profileImage: updatedUser.profileImage,
        token: generateToken(updatedUser._id),
      })
    }
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
  const username = req.query.username

  const users = await User.find(
    { username: { $regex: username, $options: "i" } },
    { username: 1 }
  )

  res.json({
    users,
  })
})

// @desc follow a user
// @route PUT /api/user/profile/follow
// access Private
export const followUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id) //current user
  const follUser = await User.findById(req.body._id) //user to follow

  if (user && follUser) {
    if (!follUser.followers.includes(user._id)) {
      //update current user's following list
      await user.updateOne({
        $push: { following: follUser._id },
      })
      //update new user's follower list
      await follUser.updateOne({
        $push: { followers: user._id },
      })
      res.status(200).json("User Followed")
    } else {
      res.status(400)
      throw new Error("Invalid Request")
    }
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc unfollow a user
// @route PUT /api/user/profile/unfollow
// access Private
export const unfollowUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id) //current user
  const unfollUser = await User.findById(req.body._id) //user to unfollow

  if (user && unfollUser) {
    if (unfollUser.followers.includes(user._id)) {
      await user.updateOne({
        $pull: { following: unfollUser._id },
      })
      await unfollUser.updateOne({
        $pull: { followers: user._id },
      })
      res.status(200).json("User Unfollowed")
    } else {
      res.status(400)
      throw new Error("Invalid Request")
    }
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc block a user
// @route PUT /api/user/profile/block
// access Private
export const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id) //current user
  const blockUser = await User.findById(req.body._id) //user to block

  if (user && blockUser) {
    if (!user.blockedUsers.includes(blockUser._id)) {
      //update current user's blockedUsers list
      await user.updateOne({
        $push: { blockedUsers: blockUser._id },
      })
      res.status(200).json("User Blocked")
    } else {
      res.status(400)
      throw new Error("Invalid Request")
    }
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc unblock a user
// @route PUT /api/user/profile/unblock
// access Private
export const unblockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id) //current user
  const unblockUser = await User.findById(req.body._id) //user to block

  if (user && unblockUser) {
    if (user.blockedUsers.includes(unblockUser._id)) {
      //update current user's blockedUsers list
      await user.updateOne({
        $pull: { blockedUsers: unblockUser._id },
      })
      res.status(200).json("User Unblocked")
    } else {
      res.status(400)
      throw new Error("Invalid Request")
    }
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc get blocked users
// @route GET /api/user/blocked
// access Private
export const getBlockedUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id) //current user

  if (!user) {
    res.status(404)
    throw new Error("User not Found")
  }

  res.status(200)
  res.json({
    blockedUsers: user.blockedUsers,
  })
})

// @desc delete user account
// @route DELETE /api/user/profile
// @access Private
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id) //get current user
  const uFollowing = user.following //user's following array
  const uFollowers = user.followers //user's followers array

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  } else {
    //delete user as a follower:
    var unfollUser

    for (let j = 0; j < uFollowers.length; j++) {
      unfollUser = await User.findById(uFollowers[j]) //users that follow the current user
      await unfollUser.updateOne({
        $pull: { following: user._id },
      })
    }

    for (let i = 0; i < uFollowing.length; i++) {
      unfollUser = await User.findById(uFollowing[i]) //users that the current user follows
      await unfollUser.updateOne({
        $pull: { followers: user._id },
      })
    }

    await User.findByIdAndDelete(user._id) //delete user from database
    res.status(200).json("You have successfully deleted your account")
  }
})

// @desc change user's role
// @route PUT /api/user/role
// access Private
export const changeUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id) //current user
  const roleUser = await User.findById(req.body._id) //user to modify role

  if (user && roleUser) {
    if (user.role !== "admin") {
      res.status(400)
      throw new Error("Not Authorized")
    }

    if (roleUser.role === "user") {
      roleUser.role = "moderator"
    } else if (roleUser.role === "moderator") {
      roleUser.role = "user"
    } else {
      res.status(404)
      throw new Error("Invalid role")
    }

    await roleUser.save()

    res.json("User Role Updated")
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc get list of posts related to a user
// @route get /api/user/playlist/:id?
// @access Private
export const getUserPlaylists = asyncHandler(async (req, res) => {
  const userId = req.params.id || req.user._id
  const user = await User.findById(userId)

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  res.json({
    playlists: user.playlists,
  })
})

// @desc get list of posts related to a user
// @route get /api/user/post/:id?
// @access Private
export const getUserPosts = asyncHandler(async (req, res) => {
  const userId = req.params.id || req.user._id
  const user = await User.findById(userId)

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  res.json({
    posts: user.posts,
  })
})
