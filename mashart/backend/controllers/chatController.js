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
      const chat = await Chat.find({ //find chats where user is present in userId array
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

// @desc leave a group chat
// @route PUT /api/chat/:id/leave
// @access Private
export const leaveChat = asyncHandler(async (req, res) => {

  const chat = await Chat.findById(req.params.id) 
  const newAdmin =  await User.findById(chat.userId[1])
  try{
    await chat.updateOne({
      $pull: { userId: req.user._id }, //remove current user from chat user list
      $set: { adminId: newAdmin } //update admin to next user
    })
    res.status(200).json("left group chat")
  }catch(err){
    //user not found
    res.status(500).json(err);
  }
})


// @desc add a user to a group chat
// @route PUT /api/chat/:id/add
// @access Private
export const addUser = asyncHandler(async (req, res) => {

  const chat = await Chat.findById(req.params.id) 
  const user = await User.findById(req.body._id)

    if(chat.userId.includes(req.body._id)){
      res.status(400)
      throw new Error("Invalid Request: User already exists in chat")
    }

    if (user.equals(chat.adminId)){
      res.status(400)
      throw new Error("Invalid Request")
    }

    try{
      await chat.updateOne({
        $push: { userId: req.body._id }
      })
      res.status(200).json(chat.userId)
    }catch(err){
      res.status(500).json(err);
    }
})