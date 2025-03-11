import
{
    getElectionData,
    addElectionData,
    updateElectionData,
    deleteElectionData,
    getAllElectionDataByPlace,
    getElectionYearsByPlace  
} from '../controllers/elections.controller.js'
import {Router} from 'express'
import {verifyAdmin} from '../middlewares/admin.middleware.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/data/:place/:year', getElectionData)
router.post('/add', verifyJWT, verifyAdmin, addElectionData)
router.put('/update/:place/:year', updateElectionData)
router.delete('/delete/:place/:year', verifyJWT, verifyAdmin, deleteElectionData)
router.get('/data/:place', getAllElectionDataByPlace)
router.get('/years/:place', getElectionYearsByPlace)

export default router