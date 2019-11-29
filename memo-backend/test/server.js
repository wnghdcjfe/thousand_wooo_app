const express = require('express')
const app     = express()   
const fs = require('fs')   
const wrapE = f => {
    console.log(f)
    return (req, res, next) => {
        f(req, res, next).catch(next)
    }
}
const PORT = 1234; 
const main = async()=>{        
    // error handler
    app.get('/', wrapE(async function (req, res, next) {
        fs.readFile('/file-does-not-exist', wrapE(async function (err, data) {
            if (err) {
              next(err) // Pass errors to Express.
            } else {
              res.send(data)
            }
          }))
    }))
    app.use((error, req, res, next) =>{    
        console.log(`error가 발생했습니다..! ${error}`)
        res.status(400).send({ success : false, message: error.message.replace(/"|\\/g, ''), error : true });
    });  
    
    app.listen(PORT, ()=> console.log(`테스팅`));
}
main();  