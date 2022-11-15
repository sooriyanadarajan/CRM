const express = require('express')
const asyncHandler = require('../middlewares/async')

const AdminController = require('../controllers/admin')

const adminController = new AdminController();

const router = express.Router()

router.post('/admin/create',  asyncHandler(adminController.create))
router.post('/list', asyncHandler(adminController.list))
// router.post('/expirylist',  asyncHandler(adminController.expirylist))
router.patch('/update', asyncHandler(adminController.update))
router.delete('/delete', asyncHandler(adminController.delete))

module.exports = router