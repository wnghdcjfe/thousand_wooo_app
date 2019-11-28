const express = require('express')
const router = express.Router()
const {checkToken} = require('../lib/jwt');
const postCtrl = require('../controllers/postCtrl');  

router.get('/', postCtrl.showList);
router.get('/:id', postCtrl.read);

router.post('/', checkToken, postCtrl.write);  
router.delete('/:id', checkToken, postCtrl.isOwn, postCtrl.write);
router.patch('/:id', checkToken, postCtrl.isOwn, postCtrl.update);

module.exports = router;