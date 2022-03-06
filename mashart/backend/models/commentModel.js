import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    text: {
        type: String,
        required: true,
        maxLength: 500
    },
    likes: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    reportCount: {
        type: Number,
        default: 0
    },
    isFlagged: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
    }
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment