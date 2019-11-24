const express = require('express')
const app     = express()
const cors    = require('cors')
const http    = require("http").createServer(app) 
const util    = require('./util')() 
const path    = require('path')   
const mongoose = require('mongoose') 
const bodyParser = require('body-parser')

const api = require('./api')
const jwtMiddleware = require('./lib/jwtMiddleware') 
 

const path_dist   = path.join(__dirname, '..', './dist')   
const PORT    = process.env.PORT || 12010 
const USER = 'dabin'
const PWD = 'dabin12010'
const HOST = 'localhost:27017'
const DB = 'memo'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`   
const main = async()=>{ 
    app.use('/', express.static(path_dist))   
    app.use('/api', api.routes()); 
    app.use(bodyParser.urlencoded({ extended: false })) 
    app.use(bodyParser.json())  
    app.use(cors())  
    mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true}) 
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err))   
    mongoose.set('useFindAndModify', false);
    http.listen(PORT, ()=> console.log(`솔방이 메모 앱이 시작됩니다. http://127.0.0.1:${PORT} :: ${util._date()}`));
}
main();  