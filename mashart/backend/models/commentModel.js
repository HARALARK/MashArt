import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true,
        maxLength: 500
    },
    postId:{
        type: mongoose.Types.ObjectId, ref: 'Post'
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