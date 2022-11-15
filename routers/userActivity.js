const express = require('express')
const asyncHandler = require('../middlewares/async')

const UserActivityController = require('../controllers/userActivity')

const userActivityController = new UserActivityController();

const router = express.Router()

router.post('/create',  asyncHandler(userActivityController.create))
router.post('/list', asyncHandler(userActivityController.list))
router.post('/listOne',asyncHandler(userActivityController.listOne))
router.put('/update', asyncHandler(userActivityController.update))
router.delete('/delete', asyncHandler(userActivityController.delete))
module.exports = router