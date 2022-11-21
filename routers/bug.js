const express = require('express')
const BugController = require("../controllers/bug");
const bug = new BugController();
const router = express.Router()
const asyncHandler = require('../middlewares/async')

router.post('/bug/create',  asyncHandler(bug.create))
router.post('/bug/list', asyncHandler(bug.list))
router.put('/bug/update', asyncHandler(bug.update))
router.delete('/bug/delete', asyncHandler(bug.delete))

module.exports = router