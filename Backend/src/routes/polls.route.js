import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { verifyAdmin } from '../middlewares/admin.middleware.js'
import {
    createPoll,
    getAllPolls,
    castVote,
    getPollResults,
    deletePoll
} from '../controllers/polls.controller.js'

const router = Router()

// Public routes
router.get('/', getAllPolls)
router.get('/:pollId', getPollResults)

// Protected routes
router.post('/vote', verifyJWT, castVote)

// Admin routes
router.post('/create', verifyJWT, verifyAdmin, createPoll)
router.delete('/:pollId', verifyJWT, verifyAdmin, deletePoll)

export default router