const express = require('express')
const asyncHandler = require('../middlewares/async')

const LeaveController = require('../controllers/leave')

const leaveController = new LeaveController();

const router = express.Router()

router.post('/leave/create', asyncHandler(leaveController.create))
router.post('/leave/list', asyncHandler(leaveController.list))
router.post('/leave/listone', asyncHandler(leaveController.listOne))
router.post('/leave/update', asyncHandler(leaveController.update))
router.delete('/leave/delete',asyncHandler(leaveController.delete))
router.post('/leave/accept',asyncHandler(leaveController.leaveaccept))
router.post('/leave/notaccept',asyncHandler(leaveController.leavenotaccept))


module.exports = router