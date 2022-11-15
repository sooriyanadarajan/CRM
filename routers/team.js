const express = require('express')
const Team = require("../controllers/team");
const teamController = new Team();
const router = express.Router()
const asyncHandler = require('../middlewares/async')

router.post('/team/create',  asyncHandler(teamController.create))
router.post('/team/list', asyncHandler(teamController.list))
router.put('/team/update', asyncHandler(teamController.update))
router.delete('/team/delete', asyncHandler(teamController.delete))

module.exports = router