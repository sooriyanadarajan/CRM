const express = require('express')
const Team = require("../controllers/team");
const teamController = new Team();
const router = express.Router()
const asyncHandler = require('../middlewares/async')

router.post('/team/create',  asyncHandler(teamController.create))
router.post('/team/list', asyncHandler(teamController.list))
router.put('/team/update', asyncHandler(teamController.update))
router.delete('/team/delete', asyncHandler(teamController.delete))
router.patch('/team/updateOne',asyncHandler(teamController.updatemembers))
router.patch('/team/updateOne1',asyncHandler(teamController.updatemember1))

module.exports = router