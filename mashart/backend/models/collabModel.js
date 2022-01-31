import mongoose from 'mongoose'

const collabSchema = mongoose.Schema({
    hostId: {
        type: String, //user type?
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    isActive: {
        type: Boolean,
        default: false,
    },
    content:[{ 
        type: mongoose.Schema.Types.ObjectId, 
        refPath: 'contentModelType' 
    }],
    contentModelType: {
        type: String,
        required: true,
        enum: ['Comic', 'Post']  //content can either be a comic or an art post
    },
},
    {
        timestamps: true,
    }
)

const Collab = mongoose.model('Collab', collabSchema)

export default Collab