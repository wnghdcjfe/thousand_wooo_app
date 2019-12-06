const express = require('express')
const app     = express()
const cors    = require('cors')
const http    = require("http").createServer(app) 
const util    = require('./util')
const path    = require('path')   
const mongoose = require('mongoose')  
const cookieParser = require('cookie-parser') 
const {checkToken} = require('./lib/jwt')  

const api = require('./api') 

const path_dist   = path.join(__dirname, '..', './dist')   
const PORT    = process.env.PORT || 4000 
const USER = 'dabin'
const PWD = 'dabin12010'
const HOST = 'localhost:27017'
const DB = 'memo'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`   
const main = async()=>{ 
    //DB connection
    await mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true}) 
    .then(() =>  console.log(`DB connection succesful :: ${util._date()}`))
    .catch((err) => console.error(`DB connection error :: ${util._date()}`))   
    mongoose.set('useFindAndModify', false); 
    // app.use(cors({credentials: true}))   
    app.use(cookieParser())    
    //express가 4.16 버전부터 bodyparser지원
    app.use(express.json())    
    app.use(checkToken)
    // static path and api setting 
    app.use('/', express.static(path_dist))    
    app.use('/api', api);    
     
    
    // error handler
    app.use((error, req, res, next) =>{    
        console.log(`${util._date()} :: Error ${error}`)
        return res.status(500).send({ success : false, message: error.message.replace(/"|\\/g, ''), error : true });
    });  
    
    http.listen(PORT, ()=> console.log(`솔방이 메모 앱이 시작됩니다. http://127.0.0.1:${PORT} :: ${util._date()}`));
}
main();  