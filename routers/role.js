const express = require('express')
const asyncHandler = require('../middlewares/async')

const RoleController = require('../controllers/role')

const role = new RoleController();

const router = express.Router()

router.post('/role/create',  asyncHandler(role.create))
router.post('/role/list', asyncHandler(role.list))
router.post('/role/listOne',asyncHandler(role.listOne))
router.put('/role/update', asyncHandler(role.update))
router.delete('/role/delete', asyncHandler(role.delete))
module.exports = router