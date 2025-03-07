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

const router = Router()

router.get('/data/:place/:year', getElectionData)
router.post('/add', addElectionData)
router.put('/update/:place/:year', updateElectionData)
router.delete('/delete/:place/:year', deleteElectionData)
router.get('/data/:place', getAllElectionDataByPlace)
router.get('/years/:place', getElectionYearsByPlace)

export default router