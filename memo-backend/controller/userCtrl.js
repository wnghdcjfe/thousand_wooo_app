const User = require('../models/User.js'); 
const _ = require("fxjs/Strict");  
const config = require('../config') 
const {wrapE} = require('../util'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
exports.login = wrapE(async(req, res, next) => { 
    const {username, password} = req.body; 
    const isUser = await User.findOne({"name" : username});
    if(!isUser){
        throw new Error(`${username}은 존재하지 않는 사용자입니다.`); 
    }

    const hashedPW = isUser.password;
    const isOwn = bcrypt.compareSync(password, hashedPW); 

    if(isOwn){
        let token = jwt.sign({"user": username}, config.secret, { expiresIn: '0.5h'});
        res.status(200).send({
          success: true,
          message: '성공적으로 토큰이 발급되며 로그인이 되었습니다.',
          token: token
        });
        return;
    }else{
        throw new Error(`잘못된 비밀번호를 입력하셨습니다.`); 
    }
})
exports.register =  wrapE(async(req, res, next) => { 

})