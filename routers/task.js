const express = require('express')
const asyncHandler = require('../middlewares/async')

const TaskController = require('../controllers/task')

const taskController = new TaskController();

const router = express.Router()

router.post('/task/create', asyncHandler(taskController.create))
router.post('/task/list', asyncHandler(taskController.list))
router.patch('/task/update', asyncHandler(taskController.update))
router.post('/task/change', asyncHandler(taskController.change))

module.exports = router