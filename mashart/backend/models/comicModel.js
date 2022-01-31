import mongoose from 'mongoose'

const comicSchema = mongoose.Schema({
    title: {
        type: String,
        maxLength: 80,
        required: true,
    },
    description: {
        type: String,
        maxLength: 1000,
    },
    userId: [{   //users that created the comic
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    }],
    pages: {
        type: Array, // NOTE: add comic page schema as type
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
    }],
    tags: [String],
    likes: {
        types: Number,
        default: 0,
    },
    reportCount: {
        type: Number,
        default: 0,
    },
    isFlagged: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
    }
)

const Comic = mongoose.model('Comic', comicSchema)

export default Comic