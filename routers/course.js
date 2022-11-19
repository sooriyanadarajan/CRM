const express = require('express')
const asyncHandler = require('../middlewares/async')

const CourseController = require('../controllers/task')

const courseController = new CourseController();

const router = express.Router()


router.post('/course/create', asyncHandler(courseController.create))
router.post('/course/list', asyncHandler(courseController.list))
router.patch('/course/update', asyncHandler(courseController.update))
router.post('/bug/delete', asyncHandler(courseController.delete))
