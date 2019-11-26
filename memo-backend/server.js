const express = require('express')
const app     = express()
const cors    = require('cors')
const http    = require("http").createServer(app) 
const util    = require('./util')
const path    = require('path')   
const mongoose = require('mongoose') 
const bodyParser = require('body-parser')

const api = require('./api') 

const path_dist   = path.join(__dirname, '..', './dist')   
const PORT    = process.env.PORT || 12010 
const USER = 'dabin'
const PWD = 'dabin12010'
const HOST = 'localhost:27017'
const DB = 'memo'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`   
const main = async()=>{ 
    //DB connection
    mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true}) 
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err))   
    mongoose.set('useFindAndModify', false);

    //bodyParser setting
    app.use(bodyParser.urlencoded({ extended: false })) 
    app.use(bodyParser.json())  

    // cors setting in development version
    app.use(cors())  

    // static path and api setting 
    app.use('/', express.static(path_dist))    
    app.use('/api', api); 
    
    // error handler
    app.use((error, req, res, next) =>{    
        res.status(503).send({ success : false, message: error.message, error : true });
    });  
    
    http.listen(PORT, ()=> console.log(`솔방이 메모 앱이 시작됩니다. http://127.0.0.1:${PORT} :: ${util._date()}`));
}
main();  