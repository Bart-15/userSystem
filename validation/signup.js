const validator = require('validator');
const isEmpty = require('./isEmpty');


const validateSignupInput = (data) => {
    let errors = {}

    data.name = data.name ? data.name : ""
    data.email = data.email ? data.email : ""
    data.password = data.password ? data.password : ""
    data.confirm_password = data.confirm_password ? data.confirm_password : ""

    if(isEmpty(data.name)) {
        errors.name = "Name field is required."
    }

    if(isEmpty(data.email)) {
        errors.email = "Email field is required."
    }

    if(isEmpty(data.password)) {
        errors.password = "Password field is required."
    }

    if(isEmpty(data.confirm_password)) {
        errors.confirm_password = "Confirm password field is required."
    }

    if(data.password !== data.confirm_password) {
        errors.confirm_password = "Password must match."
    }

    if(!validator.isEmail(data.email)){
        errors.email = "Please input valid email."
    }

    return {errors, isValid:isEmpty(errors)};
}

module.exports = validateSignupInput;