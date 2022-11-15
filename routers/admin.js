const express = require('express')
const asyncHandler = require('../middlewares/async')

const AdminController = require('../controllers/admin')

const adminController = new AdminController();

const router = express.Router()

router.post('/admin/create',  asyncHandler(adminController.create))
router.post('/admin/list', asyncHandler(adminController.list))
router.patch('/admin/update', asyncHandler(adminController.update))
router.delete('/admin/delete', asyncHandler(adminController.delete))

module.exports = router