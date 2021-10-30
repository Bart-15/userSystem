const User = require('../models/user');
const secret = require('../config/keys_dev').secretOrKey;
require('../db/mongoose');



const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;


module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts,  (jwt_payload, done) => {
            User.findById(jwt_payload._id)
                .then((user) => {
                    if(user) {
                        return done(null, user)
                    }
                    return done(null, false)
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    )
}



