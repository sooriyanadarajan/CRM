const express = require('express')
const asyncHandler = require('../middlewares/async')
const adminAuth = require('../middlewares/adminAuth')
const AdminController = require('../controllers/admin')

const adminController = new AdminController();

const router = express.Router()

router.post('/admin/create',  asyncHandler(adminController.create))
router.post('/admin/list', asyncHandler(adminController.list))
router.post('/admin/login', asyncHandler(adminController.login))
router.get('/admin/logout',  asyncHandler(adminController.logout))
router.patch('/admin/update',adminAuth, asyncHandler(adminController.update))
router.delete('/admin/delete', asyncHandler(adminController.delete))

module.exports = router