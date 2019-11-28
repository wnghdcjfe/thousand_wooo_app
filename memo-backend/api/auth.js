const express = require('express')
const router = express.Router() 
const userCtrl = require('../controllers/userCtrl');  
const {checkToken} = require('../lib/jwt'); 
 
router.post('/register', userCtrl.register); 
router.post('/login', userCtrl.login); 
router.get('/check', checkToken, userCtrl.check); 

module.exports = router;