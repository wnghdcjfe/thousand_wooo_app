const User = require('../models/User.js'); 
const _ = require("fxjs/Strict");   
const {wrapE} = require('../util');  
const {generateToken} = require('../lib/jwt')
const bcrypt = require('bcryptjs');  
const Joi = require('@hapi/joi');   
const schema = Joi.object({
    username: Joi.string() 
        .min(2)
        .max(10)
        .required(),
    password: Joi.string() 
})   
 
exports.check = wrapE(async(req, res, next) => { 
    console.log("req.username : ", req.username) 
    res.status(200).send({
        success: true,
        message: '로그인됨을 확인할 수 있습니다.', 
        user : req.username
    });
})

exports.register =  wrapE(async(req, res, next) => { 
    const {username, password} = req.body; 
    await schema.validateAsync({username, password})  
    //스키마에 맞는지를 확인하는 검증 로직 필요 
    let user = await User.findOne({"username" : username}).lean();
    if(user){
        throw new Error(`${username}님은 이미 존재하는 사용자입니다.`); 
    }  
    const salt = bcrypt.genSaltSync(10);
    const hashedPW = bcrypt.hashSync(password, salt); 
    const new_user = new User({username, "password" : hashedPW}) 
    await new_user.save();
    
    user = await User.findOne({"username" : username}).lean(); 

    await generateToken(res, user._id, username); 
    res.cookie('test', 'abc').status(200).send({
        success: true,
        message: '성공적으로 토큰이 발급되며 회원가입성공 및 로그인이 되었습니다.',
        username : username
    });
    return; 
})
exports.login = wrapE(async(req, res, next) => { 
    const {username, password} = req.body;  
    await schema.validateAsync({username, password}) 
    //스키마에 맞는지를 확인하는 검증 로직 필요 
    const user = await User.findOne({"username" : username}).lean(); 
    if(!user){
        throw new Error(`${username}님은 존재하지 않는 사용자입니다.`); 
    } 
    const hashedPW = user.password;
    const isOwn = bcrypt.compareSync(password, hashedPW); 

    if(isOwn){
        await generateToken(res, user._id, username)
        res.status(200).send({
          success: true,
          message: '성공적으로 토큰이 발급되며 로그인이 되었습니다.', 
          username : username
        });
        return;
    }else{
        throw new Error(`잘못된 비밀번호를 입력하셨습니다.`); 
    }
}) 

exports.logout = wrapE(async(req, res, next) => { 
    res.clearCookie('token'); 
    res.status(204).send({
        success: true,
        message: '로그아웃이 성공적으로 완료되었습니다.', 
        username : username
      });  
}) 