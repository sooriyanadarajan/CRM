const express = require('express')
const asyncHandler = require('../middlewares/async')

const ProjectController = require('../controllers/project')

const projectController = new ProjectController();

const router = express.Router()

router.post('/project/create',  asyncHandler(projectController.create))
router.post('/project/list', asyncHandler(projectController.list))
router.patch('/project/update', asyncHandler(projectController.update))
router.delete('/project/delete',asyncHandler(projectController.delete))
router.post('/project/findById',asyncHandler(projectController.findById))
router.post('/project/findById1',asyncHandler(projectController.findById1))

module.exports = router