const express = require('express')
const router = express.Router()
const checkLogin = require('../lib/checkLogin');
const postCtrl = require('../controller/postCtrl');

router.get('/test', checkLogin, postCtrl.test);
router.get('/testLogin', postCtrl.testLogin);
router.get('/', postCtrl.showList);
router.post('/', checkLogin, postCtrl.write); 
router.get('/:id', checkLogin, postCtrl.read);
router.delete('/:id', checkLogin, postCtrl.isOwn, postCtrl.write);
router.patch('/:id', checkLogin, postCtrl.isOwn, postCtrl.update);