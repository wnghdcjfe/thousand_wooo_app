const express = require('express')
const router = express.Router()
const postRoute = require('./post');
const authRoute = require('./auth');

router.use('/post', postRoute);
router.use('/auth', authRoute);

module.exports = router; 