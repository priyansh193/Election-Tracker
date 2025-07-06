import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Poll } from "../models/polls.model.js"

const createPoll = asyncHandler(async (req, res) => {
    const { place, totalSeats, date, endDate, parties } = req.body

    if (!place || !totalSeats || !date || !endDate || !parties?.length) {
        throw new ApiError(400, "All fields are required")
    }

    const existingPoll = await Poll.findOne({ 
        place: place.toLowerCase(),
        date: new Date(date)
    })

    if (existingPoll) {
        throw new ApiError(409, "Poll already exists for this place and date")
    }

    const poll = await Poll.create({
        place: place.toLowerCase(),
        totalSeats,
        date: new Date(date),
        endDate: new Date(endDate),
        parties: parties.map(party => ({
            name: party.name,
            color: party.color,
            votes: 0
        }))
    })

    return res.status(201).json(
        new ApiResponse(201, poll, "Poll created successfully")
    )
})

const getAllPolls = asyncHandler(async (req, res) => {
    const polls = await Poll.find()
        .sort({ date: 1 })

    return res.status(200).json(
        new ApiResponse(
            200, 
            polls,
            "Polls fetched successfully"
        )
    )
})

const castVote = asyncHandler(async (req, res) => {
    const { pollId, partyName } = req.body
    const userId = req.user._id

    if (!pollId || !partyName) {
        throw new ApiError(400, "Poll ID and party name are required")
    }

    const poll = await Poll.findById(pollId)
    
    if (!poll) {
        throw new ApiError(404, "Poll not found")
    }

    const currentDate = new Date()
    const endDate = new Date(poll.endDate)

    if (currentDate > endDate) {
        throw new ApiError(400, "Poll has ended")
    }

    const partyIndex = poll.parties.findIndex(p => p.name === partyName)
    if (partyIndex === -1) {
        throw new ApiError(400, "Invalid party name")
    }

    if (poll.hasUserVoted(userId)) {
        let prevParty = '';
        for (let vote of poll.voters) {
            if (vote.userId.equals(userId)) {
                prevParty = vote.partyVotedFor;
                if (prevParty === partyName) {
                    return res.status(200).json(
                        new ApiResponse(
                            200,
                            {
                                totalVotes: poll.totalVotes,
                                partyVotes: poll.parties.find(p => p.name === partyName)?.votes ?? 0
                            },
                            "You have already voted for this party"
                        )
                    );
                }
                vote.partyVotedFor = partyName;
                break;
            }
        }

        poll.parties.forEach(party => {
            if (party.name === prevParty){
                party.votes--;
            }
            else if(party.name === partyName){
                party.votes++;
            }
        })
    } else{
        poll.parties[partyIndex].votes += 1
        poll.totalVotes += 1
    
        poll.voters.push({
            userId,
            partyVotedFor: partyName
        })
    }

    await poll.save()

    const io = req.app.get("io")
    io.emit("voteUpdate", {
        pollId : poll._id,
        totalVotes : poll.totalVotes,
        parties : poll.parties
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalVotes: poll.totalVotes,
                partyVotes: poll.parties[partyIndex].votes
            },
            "Vote recorded successfully"
        )
    )
})

const getPollResults = asyncHandler(async (req, res) => {
    const { pollId } = req.params

    const poll = await Poll.findById(pollId)
        .select("-voters.userId")

    if (!poll) {
        throw new ApiError(404, "Poll not found")
    }

    return res.status(200).json(
        new ApiResponse(200, poll, "Poll results fetched successfully")
    )
})

const deletePoll = asyncHandler(async (req, res) => {
    const { pollId } = req.params

    const poll = await Poll.findByIdAndDelete(pollId)

    if (!poll) {
        throw new ApiError(404, "Poll not found")
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Poll deleted successfully")
    )
})

export {
    createPoll,
    getAllPolls,
    castVote,
    getPollResults,
    deletePoll
}