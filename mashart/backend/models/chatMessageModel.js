import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
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

const Message = mongoose.model('Message', messageSchema)

export default Message