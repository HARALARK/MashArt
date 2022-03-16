import asyncHandler from "express-async-handler"
import Collab from "../models/collabModel.js"
import User from "../models/userModel.js"
import roomCodeGenerator from "../utils/roomCodeGenerator.js"

// @desc Create a collab room
// @route POST /api/collab/create
// @access Private
export const createCollab = asyncHandler(async (req, res) => {
  const { content } = req.body

  const user = await User.findById(req.user._id)
  if (!user) {
    throw new Error("User doesn't exist")
  }

  let CollabExist = null
  let roomCode = null
  do {
    roomCode = roomCodeGenerator()
    CollabExist = await Collab.findOne({ roomCode })
  } while (CollabExist)

  const collab = await Collab.create({
    roomCode,
    hostId: user._id,
    users: [user._id],
    content,
  })

  if (collab) {
    res.status(200)
    res.json({
      _id: collab._id,
      roomCode: collab.roomCode,
      hostId: collab.hostId,
      users: collab.users,
      content: collab.content,
    })
  } else {
    res.status(400)
    throw new Error("Invalid collab data")
  }
})

// @desc Join a collab room
// @route POST /api/collab/join
// @access Private
export const joinCollab = asyncHandler(async (req, res) => {
  const { roomCode } = req.body

  const user = await User.findById(req.user._id)
  if (!user) {
    throw new Error("User doesn't exist")
  }

  const collab = await Collab.findOne({ roomCode })

  if (!collab) {
    throw new Error("Invalid room code")
  }

  if (collab.users.length >= 3) {
    throw new Error("Room is full")
  }

  await collab.updateOne({
    $push: { users: user._id },
  })

  const updatedCollab = await Collab.findOne({ roomCode }).populate(
    "hostId",
    "username"
  )

  if (updatedCollab) {
    res.status(200)
    res.json({
      _id: updatedCollab._id,
      roomCode: updatedCollab.roomCode,
      hostId: updatedCollab.hostId,
      users: updatedCollab.users,
      content: updatedCollab.content,
    })
  } else {
    res.status(400)
    throw new Error("Invalid collab data")
  }
})

// @desc Join a collab room
// @route POST /api/collab/leave
// @access Private
export const leaveCollab = asyncHandler(async (req, res) => {
  const { roomCode } = req.body

  const user = await User.findById(req.user._id)
  if (!user) {
    throw new Error("User doesn't exist")
  }

  const collab = await Collab.findOne({ roomCode })

  if (!collab) {
    throw new Error("Invalid room code")
  }

  if (collab.users.length < 1) {
    throw new Error("Room is empty")
  }

  if (!collab.users.includes(user._id)) {
    throw new Error("Invalid Request")
  }

  await collab.updateOne({
    $pull: { users: user._id },
  })

  const updatedCollab = await Collab.findOne({ roomCode }).populate(
    "hostId",
    "username"
  )

  if (updatedCollab) {
    if (updatedCollab.users.length < 1) {
      await Collab.findByIdAndDelete(updatedCollab._id)
      res.status(200)
      res.json({
        message: "Successfully Deleted",
      })
    }

    res.status(200)
    res.json({
      _id: updatedCollab._id,
      roomCode: updatedCollab.roomCode,
      hostId: updatedCollab.hostId,
      users: updatedCollab.users,
      content: updatedCollab.content,
    })
  } else {
    res.status(400)
    throw new Error("Invalid collab data")
  }
})

// @desc get a collab room's users
// @route GET /api/collab/users/:roomCode
// @access Private
export const getCollabUsers = asyncHandler(async (req, res) => {
  const roomCode = req.params.roomCode

  const user = await User.findById(req.user._id)
  if (!user) {
    throw new Error("User doesn't exist")
  }

  const collab = await Collab.findOne({ roomCode }).populate(
    "users",
    "profileImage"
  )

  if (!collab) {
    throw new Error("Invalid room code")
  }

  if (collab) {
    res.status(200)
    res.json({
      users: collab.users,
    })
  } else {
    res.status(400)
    throw new Error("Invalid collab data")
  }
})
