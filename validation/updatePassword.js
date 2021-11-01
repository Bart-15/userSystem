const isEmpty = require('./isEmpty');


const validateUpdatePasswordInput = (data) => {
    let errors = {}

    data.old_password = data.old_password ? data.old_password : "";
    data.new_password = data.new_password ? data.new_password : "";
    data.confirm_password = data.confirm_password ? data.confirm_password : "";

   if(isEmpty(data.old_password)) {
       errors.old_password = "Old password is required";
   }

   if(isEmpty(data.new_password)) {
       errors.new_password = "New password is required";
   }

   if(isEmpty(data.confirm_password)){
       errors.confirm_password = "Confirm password is required";
   }


    return {errors, isValid:isEmpty(errors)};
}

module.exports = validateUpdatePasswordInput;