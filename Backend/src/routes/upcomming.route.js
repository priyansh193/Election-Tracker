import {addUpcomingElection, deleteUpcomingElection, getAllUpcomingElections} from '../controllers/upcomming.controller.js'
import {Router} from 'express'

const router = Router()

router.route('/add').post(addUpcomingElection)
router.route('/delete/:place').delete(deleteUpcomingElection)
router.route('/').get(getAllUpcomingElections)

export default router  
