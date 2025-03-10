import mongoose from "mongoose";

const upcommingElectionSchema = new mongoose.Schema({
    place: {
        type: String,
        required: [true, "Place name is required"],
        trim: true,
        index: true
    },
    date: {
        type: String,
        required: [true, "Election date is required"],
        index: true
    },
    totalSeats: {
        type: Number,
        required: [true, "Total seats is required"],
        min: 1
    },
    category: {
        type: String,
        required: [true, "Election category is required"],
        trim: true
    },
}, {
    timestamps: true
});

upcommingElectionSchema.index({ place: 1, year: 1 }, { unique: true });

export const UpcommingElections = mongoose.model("UpcommingElections", upcommingElectionSchema);