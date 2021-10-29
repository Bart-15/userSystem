const express = require('express');
const User = require('../models/user')
const router = express.Router();
const gravatar = require('gravatar');
require('../db/mongoose')
const bcrypt = require('bcryptjs');



router.post('/api/signup', async (req, res) => {

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

    try {
        await newUser.save()
        res.json({message: 'success'})
    } catch (err) {
        res.status(400).json()
    }

})


module.exports = router;