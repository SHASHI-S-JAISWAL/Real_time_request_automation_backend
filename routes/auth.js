const router = require('express').Router()  ;
const User = require ('../model/User');
//const { restart } = require('nodemon');
const jwt = require ('jsonwebtoken') ;

//Register 
router.post('/register',async (req,res) => {

    const emailexist = await User.findOne({email:req.body.email});
    if (emailexist) return res.status (400).send('Email Already exists') ;

    const user  = new User ({
        name :req.body.name,
        email: req.body.email,
        password : req.body.password     
    });
    try {
        console.log('trying');
        const savedUser = await user.save() ;
        res.send (savedUser);
    } catch (error) {
        res.status(400).send(err);
    }
}); 

//Login
router.post ('/login',async (req,res) =>{
    //email is correct
    const user = await User.findOne({email:req.body.email});
    if (!user) return res.status (400).send('Email Doesnt exists') ;
    //password is correct
    if (user.password !== req.body.password) return res.send('Invalid Password') ;
    
    //create and assign token
    const token = jwt.sign({_id :user._id },process.env.TOKEN_SECRET) ;
    res.header ('auth-token',token ).send(token);
});

module.exports  = router ;