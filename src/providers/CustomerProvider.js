import config from '../config';
let setDetailsForRegister = async (body, headers, method, isShopify) => {
    let manage_data = {};
    let data = {customer:{}}
    if(isShopify){
        data['customer']['first_name'] = body.customer.firstname;
        data['customer']['last_name'] = body.customer.lastname;
        data['customer']['email'] = body.customer.email;
        data['passsword'] = body.passsword;
        manage_data.body = data;
        manage_data.endUrl = config.shopifyUrl + "/customers.json";
        manage_data.method = method;
        return manage_data;
    } else {
        manage_data.endUrl = config.magentoUrl + "/V1/customers";
        manage_data.body = body;
        manage_data.method = method;
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        return manage_data;
    }
};

let setDetailsForLogin = async (body, headers, method, isShopify) => {
    let manage_data = {};
    if(isShopify){
        manage_data.endUrl = config.shopifyUrl + "/customers/search.json?query=email:"+body.username;
        manage_data.method = config.getMethod;
        return manage_data;
    } else {
        manage_data.endUrl = config.magentoUrl + "/V1/integration/customer/token";
        manage_data.body = body;
        manage_data.method = method;
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        return manage_data;
    }
};

let setDetailsForForgotPassword = async (req) => {
    
};

export default {
    setDetailsForLogin,
    setDetailsForRegister,
    setDetailsForForgotPassword,
};