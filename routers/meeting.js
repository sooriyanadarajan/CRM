const express = require('express')
const asyncHandler = require('../middlewares/async')

const MeetingController = require('../controllers/meeting')

const meetingController = new MeetingController();

const router = express.Router()

router.post('/meeting/create',  asyncHandler(meetingController.create))
router.post('/meeting/list', asyncHandler(meetingController.list))
router.post('/meeting/update', asyncHandler(meetingController.update))
router.post('/meeting/delete', asyncHandler(meetingController.delete))
router.post('/meeting/changestatus', asyncHandler(meetingController.changeStatus))



module.exports = router