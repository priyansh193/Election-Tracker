import { asyncHandler } from "../utils/asyncHandler.js"
import  {ApiError}  from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ElectionData } from "../models/elections.model.js"

const getElectionData = asyncHandler(async (req, res) => {
    const { place, year } = req.params

    const electionData = await ElectionData.findOne({ place : place.toLowerCase(), year })

    if (!electionData) {
        throw new ApiError(404, "Election data not found")
    }

    return res.status(200).json(
        new ApiResponse(200, electionData, "Election data fetched successfully")
    )
})

const addElectionData = asyncHandler(async (req, res) => {
    const { 
        place, 
        year, 
        totalSeats, 
        majorityMark,
        votingPercentage,
        parties 
    } = req.body

    if (!place || !year || !totalSeats || !majorityMark || !votingPercentage || !parties) {
        throw new ApiError(400, "All fields are required")
    }

    if (!Array.isArray(parties) || parties.length === 0) {
        throw new ApiError(400, "At least one party data is required")
    }

    const existingData = await ElectionData.findOne({ place : place.toLowerCase(), year })

    if (existingData) {
        throw new ApiError(409, "Election data already exists for this place and year")
    }

    // Create new election data
    const electionData = await ElectionData.create({
        place : place.toLowerCase(),
        year,
        totalSeats,
        majorityMark,
        votingPercentage,
        parties
    })

    return res.status(201).json(
        new ApiResponse(201, electionData, "Election data added successfully")
    )
})

const updateElectionData = asyncHandler(async (req, res) => {
    const { place, year } = req.params
    const updateData = req.body

    const updatedData = await ElectionData.findOneAndUpdate(
        { place : place.toLowerCase(), year },
        updateData,
        { 
            new: true,
            runValidators: true
        }
    )

    if (!updatedData) {
        throw new ApiError(404, "Election data not found")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedData, "Election data updated successfully")
    )
})

const deleteElectionData = asyncHandler(async (req, res) => {
    const { place, year } = req.params

    const deletedData = await ElectionData.findOneAndDelete({ place : place.toLowerCase(), year })

    if (!deletedData) {
        throw new ApiError(404, "Election data not found")
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Election data deleted successfully")
    )
})

const getAllElectionDataByPlace = asyncHandler(async (req, res) => {
    const { place } = req.params

    const electionData = await ElectionData.find({ place : place.toLowerCase() })
        .sort({ year: -1 })

    if (!electionData.length) {
        throw new ApiError(404, "No election data found for this place")
    }

    return res.status(200).json(
        new ApiResponse(200, electionData, "Election data fetched successfully")
    )
})

const getElectionYearsByPlace = asyncHandler(async (req, res) => {
    const { place } = req.params

    const elections = await ElectionData.find({ place : place.toLowerCase() })
        .select('year -_id')
        .sort({ year: -1 })

    if (!elections.length) {
        throw new ApiError(404, `No election years found for ${place}`)
    }

    const years = elections.map(election => election.year)

    return res.status(200).json(
        new ApiResponse(
            200, 
            { place, years }, 
            "Election years fetched successfully"
        )
    )
})

export {
    getElectionData,
    addElectionData,
    updateElectionData,
    deleteElectionData,
    getAllElectionDataByPlace,
    getElectionYearsByPlace  
}