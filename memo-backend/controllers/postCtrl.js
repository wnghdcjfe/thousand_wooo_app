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