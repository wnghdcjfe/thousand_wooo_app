const Post = require('../models/Post.js'); 
const _ = require("fxjs/Strict");  
const config = require('./config') 
const {wrapE} = require('../utils'); 

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
    if(!req.user){res.sendStatus(401); return;} 
    const post = await Post.insert(req.body);
    if(post) res.sendStatus(200);
    else res.sendStatus(500);
})
exports.update = wrapE(async(req, res, next) => {
    const query = ''
    const post = await Post.update(query);
    if(post) res.sendStatus(200);
    else res.sendStatus(500);
})
exports.test = wrapE(async(req, res, next) => {
    res.json({
        success: true,
        message: 'Index page'
    });
})
exports.testLogin = wrapE(async(req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username},
          config.secret, { expiresIn: '24h'}
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
})