const jwt = require('jsonwebtoken');
const config = require('../config'); 
const removeStr = (str, token) => {
  if(token.includes(str))return token.slice(str.length, token.length);
  return token;
} 
module.exports = function checkLogin(req, res, next) {
  let token = req.headers['authorization'];  
  if (token) {
    token = removeStr('Bearer ', token) 
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        throw new Error('토큰이 만료되었습니다.');  
      } else {
        console.log("decoded", decoded)
        req.decoded = decoded;
        next();
      }
    });
  } else {
    throw new Error('토큰이 존재하지 않습니다.'); 
  }
};