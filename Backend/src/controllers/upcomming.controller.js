import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { UpcommingElections } from "../models/upcomming.model.js"

const addUpcomingElection = asyncHandler(async (req, res) => {
    const { 
        place, 
        date, 
        totalSeats, 
        category 
    } = req.body

    // Validate required fields
    if (!place || !date || !totalSeats || !category) {
        throw new ApiError(400, "All fields are required")
    }

    // Check for existing entry
    const existingElection = await UpcommingElections.findOne({ place })
    if (existingElection) {
        throw new ApiError(409, "Election already exists for this state")
    }

    // Create new entry
    const upcomingElection = await UpcommingElections.create({
        place : place.toLowerCase(),
        date,
        totalSeats,
        category
    })

    return res.status(201).json(
        new ApiResponse(
            201, 
            upcomingElection, 
            "Upcoming election added successfully"
        )
    )
})

const deleteUpcomingElection = asyncHandler(async (req, res) => {
    const { place } = req.params

    const deletedElection = await UpcommingElections.findOneAndDelete({ place: place.toLowerCase() })

    if (!deletedElection) {
        throw new ApiError(404, "Election not found")
    }

    return res.status(200).json(
        new ApiResponse(
            200, 
            null, 
            "Upcoming election deleted successfully"
        )
    )
})

const getAllUpcomingElections = asyncHandler(async (req, res) => {
    const elections = await UpcommingElections.find()
        .sort({ date: 1 })

    if (!elections.length) {
        throw new ApiError(404, "No upcoming elections found")
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            elections,
            "Upcoming elections fetched successfully"
        )
    )
})

export {
    addUpcomingElection,
    deleteUpcomingElection,
    getAllUpcomingElections
}