let register = async (req) => {
    req.endPoint = '/rest/V1/customers';
};

let login = async (req) => {
    req.endPoint = '/rest/V1/integration/customer/token';
};

let forgotPassword = async (req) => {
    req.endPoint = '/excellence/mobile/api/v1';
};

let social_account = async (req) => {
    req.endPoint = '/rest/V1/directory/countries';
};

let delete_account = async (req) => {
    req.endPoint = '/rest/V1/directory/countries';
};

let logout = async (req) => {
    req.endPoint = '/rest/V1/directory/countries';
};

export default {
    login,
    register,
    forgotPassword,
    social_account
};