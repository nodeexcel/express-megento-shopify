let register = async (checkBody, validation) => {
    checkBody("username", "Username cannot be empty").notEmpty();
    checkBody("firstname", "Firstname cannot be empty").notEmpty();
    checkBody("lastname", "Fastname cannot be empty").notEmpty();
    checkBody("email", "Email cannot be empty").notEmpty();
    checkBody("pass", "Password cannot be empty").notEmpty();
    checkBody('conpass', 'Passwords do not match.').equals(checkBody.pass);
    var errors = validation();
    if (errors) {
        throw new Error(errors[0].msg);
    } else {
        return 1;
    }

};

let login = async (req) => {

};

let forgotPassword = async (req) => {

};

let social_account = async (req) => {

};

export default {
    login,
    register,
    forgotPassword,
    social_account
};