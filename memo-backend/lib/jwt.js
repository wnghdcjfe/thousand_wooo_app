const jwt = require('jsonwebtoken'); 
const {secret, tokenDuration} = require('../config'); 

exports.generateToken = (res, id, username) =>{
    const token = jwt.sign({id, username}, secret,{expiresIn : tokenDuration})  
    res.cookie('token', token, {
        maxAge : 1000 * 60 * 60 * 24,
        httpOnly : true 
    })  
}   
exports.checkToken = (req, res, next) =>{  
  let token = req.cookies['token']; 
  if (token) {    
    jwt.verify(token, secret, (err, decoded) => {
      if (err) { 
        return next(err);
      } else { 
        req.username = decoded.username 
        return next();
      }
    });
  } else {  
    return next(); 
  }
};