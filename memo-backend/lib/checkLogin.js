let jwt = require('jsonwebtoken');
const config = require('./config');
const removeStr = (str, token) => {
  if(token.includes(str))return token.slice(str.length, token.length);
  return token;
} 
module.exports = function checkLogin(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  token = removeStr('Bearer ', token) 
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        console.log("decoded", decoded)
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};