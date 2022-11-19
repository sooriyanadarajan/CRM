const express = require('express')
const asyncHandler = require('../middlewares/async')

const BugController = require('../controllers/task')

const BugController = new BugController();

const router = express.Router()


router.post('/bug/create', asyncHandler(bugController.create))
router.post('/bug/list', asyncHandler(bugController.list))
router.patch('/bug/update', asyncHandler(bugController.update))
router.post('/bug/delete', asyncHandler(taskController.delete))
