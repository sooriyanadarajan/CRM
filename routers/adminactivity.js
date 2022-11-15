const express = require('express')
const asyncHandler = require('../middlewares/async')

const Adminactivitycontroller = require('../controllers/adminactivity');

const adminactivitycontroller = new Adminactivitycontroller();

const router = express.Router()

router.post('/create',  asyncHandler(adminactivitycontroller.create))

module.exports = router