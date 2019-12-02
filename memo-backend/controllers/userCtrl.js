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
    if(!req.user){
        return res.status(401).send({ message: "로그인이 되어있지 않습니다.", error : true });   
    }    
    return res.status(200).send(req.user);
})

exports.register =  wrapE(async(req, res, next) => { 
    const {username, password} = req.body; 
    await schema.validateAsync({username, password})  
    //스키마에 맞는지를 확인하는 검증 로직 필요 
    let user = await User.findOne({"username" : username}).lean();
    if(user){
        return res.status(409).send({ message: `${username}님은 이미 존재하는 사용자입니다.`, error : true });    
    }  
    const salt = bcrypt.genSaltSync(10);
    const hashedPW = bcrypt.hashSync(password, salt); 
    const new_user = new User({username, "password" : hashedPW}) 
    await new_user.save();
    
    user = await User.findOne({"username" : username}).lean();  
    await generateToken(res, user._id, user.username); 
    return res.status(200).send({_id : user._id, username : user.username});
})
exports.login = wrapE(async(req, res, next) => { 
    const {username, password} = req.body;  
    await schema.validateAsync({username, password})  
    const user = await User.findOne({"username" : username}).lean(); 
    if(!user){     
        return res.status(401).send({ message: `${username}님은 존재하지 않는 사용자입니다.`, error : true });     
    } 
    const hashedPW = user.password;
    const isOwn = bcrypt.compareSync(password, hashedPW); 

    if(isOwn){
        await generateToken(res, user._id, user.username)
        return res.status(200).send({_id : user._id, username : user.username})  
    }else{
        return res.status(401).send({ message: `잘못된 비밀번호를 입력하셨습니다.`, error : true });    
    }
}) 

exports.logout = wrapE(async(req, res, next) => { 
    res.clearCookie('token'); 
    return res.status(204).send();
}) 