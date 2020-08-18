const router = require('express').Router()  ;
const verify  = require('./verifytoken');

router.get('/todo',verify,(req,res)=>{
    res.json ({
        todo :"data"
    });
});

module.exports = router;