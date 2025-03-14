import mongoose from "mongoose"

const pollSchema = new mongoose.Schema({
    place: {
        type: String,
        required: [true, "Place name is required"],
        trim: true,
        lowercase: true
    },
    totalSeats: {
        type: Number,
        required: [true, "Total seats are required"]
    },
    date: {
        type: Date,
        required: [true, "Poll date is required"]
    },
    endDate: {
        type: Date,
        required: [true, "Poll end date is required"]
    },
    parties: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        votes: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            required: true,
            default: "#000000"
        }
    }],
    voters: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        votedAt: {
            type: Date,
            default: Date.now
        },
        partyVotedFor: {
            type: String,
            required: true
        }
    }],
    totalVotes: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

// Method to check if a user has voted
pollSchema.methods.hasUserVoted = function(userId) {
    return this.voters.some(voter => voter.userId.equals(userId))
}

// Method to check if poll is still active
pollSchema.methods.isPollActive = function() {
    return this.isActive && new Date() <= this.endDate
}

export const Poll = mongoose.model("Poll", pollSchema)