import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get('/protected', verifyJWT, (req, res) => {
    res.json({message : 'You have access', user:req.user})
})

export default router;