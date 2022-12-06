const express = require('express')
const router = express.Router()
const asyncHandler = require('../middlewares/async')
const BugController = require("../controllers/bug");
const bug = new BugController();

router.post('/bug/create',  asyncHandler(bug.create))
router.post('/bug/list', asyncHandler(bug.list))
router.post('/bug/listid', asyncHandler(bug.listid))
router.post('/bug/listOne', asyncHandler(bug.listOne))
router.put('/bug/update', asyncHandler(bug.update))
router.put('/bug/updatestatus', asyncHandler(bug.updatestatus))
router.put('/bug/updatebug', asyncHandler(bug.updatebug))
router.delete('/bug/delete', asyncHandler(bug.delete))
router.post('/bug/insert',asyncHandler(bug.insert))
router.post('/bug/updateBugActivity',asyncHandler(bug.updateBugActivity))
// router.post('/bug/bugno',asyncHandler(bug.getNextSequenceValue))
router.post('/bug/findbyid',asyncHandler(bug.findById))
router.post('/bug/listed',asyncHandler(bug.listed))
router.post('/bug/listedorder',asyncHandler(bug.listedorder))
router.post('/bug/createPin',asyncHandler(bug.createPin))
module.exports = router