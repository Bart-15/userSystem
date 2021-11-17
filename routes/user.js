const express = require('express');
require('../db/mongoose')
const User = require('../models/user')
const router = express.Router();

const secretOrKey = require('../config/keys_dev').secretOrKey
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar');
const passport = require('passport');
const sharp = require('sharp')
const multer = require('multer');
const bcrypt = require('bcryptjs');

// Validation
const validateSignupInput = require('../validation/signup')
const validateLoginInput = require('../validation/login')
const validateUpdatePasswordInput = require('../validation/updatePassword')


// multer options
const upload = multer({
    limits : {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
        cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})

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
        // const avatar = gravatar.url(req.body.email, {
        //         s:'200', //size of image
        //         r:'pg', 
        //         d:'mm'
        // })

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password:hashPassword,
            avatar:null
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
        }

        const token = await jwt.sign(payload, secretOrKey, {expiresIn: 3600})
        res.status(200).json({success:true, token:token})

    }catch(err){
        res.status(400).json()
    }
})

// @POST 
// Protected route 
// Endpoint : /api/myprofile
router.get('/api/myprofile', passport.authenticate('jwt', { session: false }), (req, res) => {

    const payload = {
        name:req.user.name,
        email:req.user.email,
        avatar:req.user.avatar,
    }
     
    res.status(200).json(payload)
})

// @POST 
// Protected route 
// Endpoint : /api/myprofile/delete
router.delete('/api/myprofile/delete', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id)
        res.json({success: true})
    } catch(err) {
        res.status(400).json()
    }
})



// @POST 
// Protected route 
// Endpoint : /api/myprofile/avatar
router.post('/api/myprofile/avatar', passport.authenticate('jwt', {session:false}), upload.single('avatar'), async(req, res) => {
    const user = await User.findById(req.user._id)
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
    const base64Image = new Buffer.from(buffer).toString("base64");

    try {
        user.avatar = base64Image;
        await user.save();
        res.status(200).json({success: true, message:"Avatar uploaded successfully."})
    } catch(err) {
        res.status(401).send()
    }
})


// @POST 
// Protected route 
// Endpoint : /api/myprofile/avatar/delete
router.delete('/api/myprofile/avatar/delete/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const user = await User.findById(req.user.id);

    // set default image gravatar
    const avatar = gravatar.url(req.user.email, {
        s:'200', //size of image
        r:'pg', 
        d:'mm'
    })

    try {
        user.avatar = avatar;
        await user.save();
        res.status(200).json({success: true, message: 'Avatar deleted successfully'});
    } catch (err) {
        res.status(401).json()
    }
})


// @POST 
// Protected Route
// Endpoint: /api/myprofile/update-password/
router.post('/api/myprofile/update-password', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const user = await User.findById(req.user._id);
    
    const {errors, isValid} = validateUpdatePasswordInput(req.body)

    if(!isValid) {
       return res.status(400).json(errors)
    }

    const passwordMatch = await bcrypt.compare(req.body.old_password, user.password);
    if(!passwordMatch) {
        errors.confirm_password = "Must match old password";
        return res.status(404).json(errors);
    }

    if(req.body.new_password !== req.body.confirm_password) {
        errors.new_password = "New password must match confirm password";
        return res.status(404).json(errors);
    }

    try {
        const hashPassword = await bcrypt.hash(req.body.new_password, 8)

        user.password = hashPassword;
        await user.save();
        res.status(200).json({success: true, message:"Password updated successfully"})

    }catch(e) {
        res.status(400).json(errors);
    }
})

module.exports = router;