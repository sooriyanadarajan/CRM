const express = require('express')
const asyncHandler = require('../middlewares/async')

const TaskController = require('../controllers/task')

const taskController = new TaskController();

const router = express.Router()

router.post('/create',  asyncHandler(taskController.create))
router.post('/list', asyncHandler(taskController.list))
router.post('/expirylist',  asyncHandler(taskController.expirylist))
router.patch('/update', asyncHandler(taskController.update))

module.exports = router