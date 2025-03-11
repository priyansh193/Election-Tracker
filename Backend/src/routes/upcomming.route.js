import {addUpcomingElection, deleteUpcomingElection, getAllUpcomingElections} from '../controllers/upcomming.controller.js'
import {Router} from 'express'
import { verifyAdmin } from '../middlewares/admin.middleware.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/add').post(verifyJWT, verifyAdmin, addUpcomingElection)
router.route('/delete/:place').delete(verifyJWT, verifyAdmin, deleteUpcomingElection)
router.route('/').get(getAllUpcomingElections)

export default router  
