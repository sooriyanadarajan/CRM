const express = require('express')
const router = express.Router()
const asyncHandler = require('../middlewares/async')
const BugController = require("../controllers/bug");
const bug = new BugController();

router.post('/bug/create',  asyncHandler(bug.create))
router.post('/bug/list', asyncHandler(bug.list))
router.post('/bug/listOne', asyncHandler(bug.listOne))
router.put('/bug/update', asyncHandler(bug.update))
router.delete('/bug/delete', asyncHandler(bug.delete))

module.exports = router