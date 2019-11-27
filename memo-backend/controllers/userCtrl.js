const User = require('../models/User.js'); 
const _ = require("fxjs/Strict");  
const {secret, tokenDuration} = require('../config') 
const {wrapE} = require('../util'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');  
exports.login = wrapE(async(req, res, next) => { 
    const {username, password} = req.body;  
    //스키마에 맞는지를 확인하는 검증 로직 필요 
    const isUser = await User.findOne({"username" : username}).lean(); 
    if(!isUser){
        throw new Error(`${username}님은 존재하지 않는 사용자입니다.`); 
    }

    const hashedPW = isUser.password;
    const isOwn = bcrypt.compareSync(password, hashedPW); 

    if(isOwn){
        let token = jwt.sign({"user": username}, secret, { expiresIn: tokenDuration});
        res.cookie('jwtToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
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
    const {username, password} = req.body; 
    
    //스키마에 맞는지를 확인하는 검증 로직 필요

    console.log(username, password)
    const isUser = await User.findOne({"username" : username}).lean();
    if(isUser){
        throw new Error(`${username}은 이미 존재하는 사용자입니다.`); 
    } 
    const salt = bcrypt.genSaltSync(10);
    const hashedPW = bcrypt.hashSync(password, salt); 
    const new_user = new User({username, "password" : hashedPW}) 
    await new_user.save();

    let token = jwt.sign({"user": username}, secret, { expiresIn: tokenDuration});
    res.cookie('jwtToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.status(200).send({
        success: true,
        message: '성공적으로 토큰이 발급되며 회원가입성공 및 로그인이 되었습니다.',
        token: token
    });
    return; 
})