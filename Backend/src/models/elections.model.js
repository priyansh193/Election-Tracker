import mongoose from "mongoose";

const electionDataSchema = new mongoose.Schema({
    place: {
        type: String,
        required: [true, "Place name is required"],
        trim: true,
        index: true
    },
    year: {
        type: String,
        required: [true, "Election year is required"],
        trim: true,
        index: true
    },
    totalSeats: {
        type: Number,
        required: [true, "Total seats is required"],
        min: 1
    },
    majorityMark: {
        type: Number,
        required: [true, "Majority mark is required"],
        min: 1
    },
    votingPercentage: {
        type: Number,
        required: [true, "Voting percentage is required"],
        min: 0,
        max: 100
    },
    parties: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        seatsWon: {
            type: Number,
            required: true,
            min: [0, "Seats won cannot be negative"]
        },
        voteShare: {
            type: Number,
            required: true,
            min: [0, "Vote share cannot be negative"],
            max: [100, "Vote share cannot exceed 100%"]
        },
        color: {
            type: String,
            required: true,
            match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code"]
        }
    }],
}, {
    timestamps: true
});

electionDataSchema.index({ place: 1, year: 1 }, { unique: true });

electionDataSchema.virtual('totalVotesCast').get(function() {
    return this.parties.reduce((total, party) => total + party.voteShare, 0);
});

electionDataSchema.pre('save', function(next) {
    const totalVoteShare = this.parties.reduce((sum, party) => sum + party.voteShare, 0);
    if (totalVoteShare > 100) {
        next(new Error('Total vote share cannot exceed 100%'));
    }
    next();
});

export const ElectionData = mongoose.model("ElectionData", electionDataSchema);