const express = require('express');
const User = require('../models/user')
const router = express.Router();
const validateSignupInput = require('../validation/signup')
const validateLoginInput = require('../validation/login')
const secretOrKey = require('../config/keys_dev').secretOrKey
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar');
const passport = require('passport');
require('../db/mongoose')
const bcrypt = require('bcryptjs');


// @POST  /users/create
// Endpoint : /api/signup

router.post('/api/signup', async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    const {errors, isValid} = validateSignupInput(req.body)
    if(!isValid) {
        return res.status(400).json(errors)
    }
    
    
    try {
        // check if user is already taken 
        if(user) {
             errors.email = "Email is already taken"
             return res.status(400).json(errors)
        }

        // hash the password before saving
        const hashPassword = await bcrypt.hash(req.body.password, 8)

        //default image
        const avatar = gravatar.url(req.body.email, {
                s:'200', //size of image
                r:'pg', 
                d:'mm'
        })

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password:hashPassword,
            avatar
        })

        await newUser.save()
        res.json({message: 'success'})

    } catch(e) {
        res.status(400).json()
    }
})


// @POST  
// Endpoint : /api/login
router.post('/api/login', async (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    const user = await User.findOne({email: req.body.email})
    if(!isValid) {
        return res.status(400).json(errors);
    }
    
    
    try{
        if(!user){
            errors.email = "User not found.";
            return res.status(404).json(errors);
        }
    
        const passwordMatch = await bcrypt.compare(req.body.password, user.password)
    
        if(!passwordMatch) {
            errors.password = "Password does not match";
            return res.status(404).json(errors);
        }

        const payload = {
            _id:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar,
        }

        const token = await jwt.sign(payload, secretOrKey, {expiresIn: 3600})
        res.status(200).json({success:true, token:'Bearer '+ token})

    }catch(err){
        res.status(400).json()
    }
})


router.get('/api/myprofile', passport.authenticate('jwt', { session: false }), (req, res) => {
   
    const payload = {
        name:req.user.name,
        email:req.user.email,
        avatar:req.user.avatar,
    }
     
    res.status(200).json(payload)
    
})


module.exports = router;