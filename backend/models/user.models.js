const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        github: {
            type: String,
            default: ""
        },
        googleId: {
            type: String,
            default: ""
        },
        profilePicture: { 
            type: String, 
            default: "https://avatars.githubusercontent.com/u/1503559?v=4" 
        },
        submissionHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Submission'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    }
);

const User = mongoose.model('User', userSchema);

module.exports = { User };
