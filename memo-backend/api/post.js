const express = require('express')
const router = express.Router()
const checkLogin = require('../lib/checkLogin');
const postCtrl = require('../controllers/postCtrl');  

router.get('/', postCtrl.showList);
router.post('/', checkLogin, postCtrl.write); 
router.get('/:id', checkLogin, postCtrl.read);
router.delete('/:id', checkLogin, postCtrl.isOwn, postCtrl.write);
router.patch('/:id', checkLogin, postCtrl.isOwn, postCtrl.update);

module.exports = router;