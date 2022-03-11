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
      hostId: collab.hostId,
      users: collab.users,
      content: collab.content,
    })
  } else {
    res.status(400)
    throw new Error("Invalid collab data")
  }
})
