const isEmpty = require('./isEmpty');


const validateLoginInput = (data) => {
    let errors = {}

    data.email = data.email ? data.email : ""
    data.password = data.password ? data.password : ""

    if(isEmpty(data.email)) {
        errors.email = "Email field is required."
    }

    if(isEmpty(data.password)) {
        errors.password = "Password field is required."
    }


    return {errors, isValid:isEmpty(errors)};
}

module.exports = validateLoginInput;