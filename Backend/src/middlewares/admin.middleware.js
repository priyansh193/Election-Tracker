import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const verifyAdmin = asyncHandler(async (req, _, next) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized request")
    }

    if (req.user.username !== process.env.ADMIN_USERNAME) {
        throw new ApiError(403, "Admin access required")
    }

    next()
})

export { verifyAdmin }