import asyncHandler from "express-async-handler"
import Chat from "../models/chatModel.js"
import User from "../models/userModel.js"
import Message from "../models/chatMessageModel.js"

// @desc Create a chat message
// @route POST /api/message/:id
// @access Private
export const newMessage = asyncHandler(async (req, res) => {
  
  const senderId = await User.findById(req.user._id) 
  const text = req.body.text

  try{
    const message = await Message.create({
      senderId,
      text
    })
    const chat = await Chat.findById(req.params.id)
    if (chat){
        await chat.updateOne({
         $push: { chatMessages: message },
        })
    }

    res.status(200).json(message);
  }catch(err){
    res.status(500).json(err);
  }
})

// @desc get chat's messages
// @route GET /api/message/:id
// @access Private
export const getMessages = asyncHandler(async (req, res) => {

  const chat = await Chat.findById(req.params.id)
  try{
    const messageArray = chat.chatMessages
    res.status(200).json(messageArray);
  }
  catch(err){
    res.status(500).json(err);
  }
})