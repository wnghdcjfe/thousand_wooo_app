const express = require('express')
const app     = express()   
const path     = require('path')
const fs = require('fs')   
const wrapE = f => {
    console.log(f)
    return (req, res, next) => {
        f(req, res, next).catch(next)
    }
} 

const main = async()=>{        
    // error handler
    //app.use(express.static(path.join(__dirname, './dist')))
    app.get('/test', wrapE(async function (req, res, next) {
        res.status(204).send({"data" : 1}) 
    })) 
    // app.get('/test/test', wrapE(async function (req, res, next) {
    //     res.status(204).send({"data" : 1}) 
    // })) 
    app.listen(1234, ()=> console.log(`테스팅`));
}
main();  