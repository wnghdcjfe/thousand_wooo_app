const express = require('express')
const router = express.Router()
const {checkToken} = require('../lib/jwt');
const postCtrl = require('../controllers/postCtrl');  
//write
router.post('/', checkToken, postCtrl.write);   

router.use('/:id', postCtrl.getPostById);
router.get('/', postCtrl.showList);   
router.get('/:id', postCtrl.read);
router.delete('/:id', checkToken, postCtrl.isOwn, postCtrl.remove);
router.patch('/:id', checkToken, postCtrl.isOwn, postCtrl.update);

module.exports = router;