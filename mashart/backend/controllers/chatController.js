import asyncHandler from "express-async-handler"
import Chat from "../models/chatModel.js"
import User from "../models/userModel.js"

// @desc Create a chat
// @route POST /api/chat
// @access Private
export const newChat = asyncHandler(async (req, res) => {
  
  const adminId = await User.findById(req.user._id) 
  const usersTxt = req.body.users
  const userId = [adminId, ...(usersTxt.split(","))]

  if(adminId){
    try{
      const chat = await Chat.create({
        adminId,
        userId
      })
      res.status(200)
      res.json(chat);
    }catch(err){
      res.status(500).json(err);
    }
  }
  else{
    res.status(404)
    throw new Error("User not found")
  }

})

// @desc get user's chats
// @route GET /api/chat
// @access Private

export const getChats = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id) 
  if(user){
    try {
      const chat = await Chat.find({
        userId: { $in: [user] },
      });
      res.status(200).json(chat);
    } catch (err) {
      res.status(500).json("User has no chats");
    }
  }
  else{
    res.status(404)
    throw new Error("User not found")
  }
})
