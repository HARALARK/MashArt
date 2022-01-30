import mongoose from 'mongoose'

const conversationSchema = mongoose.Schema({
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
        ref: 'Chat' 
    }],
})

const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation