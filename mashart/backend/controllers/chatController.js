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

  try{
    const chat = await Chat.create({
      adminId,
      userId
    })
    res.status(200).json(chat);
  }catch(err){
    res.status(500).json(err);
  }
})

// @desc get user's chats
// @route GET /api/chat
// @access Private

export const getChats = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id) 
  try {
    const chat = await Chat.find({
      userId: { $in: [user] },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
})



// @desc leave a group chat
// @route PUT /api/chat/:id/leave
// @access Private
export const leaveChat = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id) 
  const chat = await Chat.findById(req.params.id) 
  try{
    await chat.updateOne({
      $pull: { userId: req.user._id }
    })
    res.status(200).json(chat.userId)
  }catch(err){
    //user not found
    res.status(500).json(err);
  }

})





  


  
