const Post = require('../models/Post.js'); 
const _ = require("fxjs/Strict");  
const config = require('../config') 
const {wrapE} = require('../util'); 
const jwt = require('jsonwebtoken');

exports.showList = wrapE(async(req, res, next) => {
    const ret = Post.find().limit(10).skip((page - 1) * 10).lean()
    res.send(ret);
}) 
exports.read = wrapE(async(req, res, next) => {
    const ret = await Post.find().limit(10).skip((page - 1) * 10).lean()
    res.send(ret);
})
exports.isOwn = wrapE(async(req, res, next) => {
    const query = ''
    const post = await Post.find(query);
    if(post && post.name == req.user) req.isOwn = true; 
    else req.isOwn = false; 
    next();
})
exports.write = wrapE(async(req, res, next) => {
    if(!req.user){res.status(401); return;} 
    const post = await Post.insert(req.body);
    if(post) res.status(200);
    else res.status(500);
})
exports.update = wrapE(async(req, res, next) => {
    const query = ''
    const post = await Post.update(query);
    if(post) res.status(200);
    else res.status(500);
})
exports.test = wrapE(async(req, res, next) => {
    res.json({
        success: true,
        message: 'Index page'
    });
})
exports.testLogin = wrapE(async(req, res, next) => { 
    const {username, password} = req.body; 
    // For the given username fetch user from DB
    let mockedUsername = 12;
    let mockedPassword = 12;

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({"user": username}, config.secret, { expiresIn: '24h'});
        // return the JWT token for the future API calls
        res.status(200).send({
          success: true,
          message: '성공적으로 토큰이 발급되었습니다.',
          token: token
        });
        return;
      } else {
        res.status(403).send({
          success: false,
          message: 'Incorrect username or password'
        });
        return;
      }
    } else {
      res.status(400).send({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
      return;
    }
})