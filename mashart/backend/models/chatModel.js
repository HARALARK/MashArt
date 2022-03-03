import mongoose from 'mongoose'

const chatSchema = mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    userId: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],  //users in chat
    chatMessages: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Chats' 
    }],
})

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
