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
      //토큰에 대해 검증이 실패 한다면 그 사용자에 대한 토큰이 아니라는 것.  이 때 그냥 넘긴다. 
      if (err) {  
        return next();
      } else { 
        req.username = decoded.username 
        return next();
      }
    });
  } else {  
    return next(); 
  }
};