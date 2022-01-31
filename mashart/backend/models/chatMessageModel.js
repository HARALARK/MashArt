import mongoose from 'mongoose'

const chatSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
        maxLength: 500,
    },
},
    {
        timestamps: true,
    }
)

const Chat = mongoose.model('Chat', chatSchema)

export default Chat