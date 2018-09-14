import config from '../config';
let setDetailsForRegister = async (body, headers, url_path, method, store) => {
    let manage_data = {};
    let data = {customer:{}}
    if(store == 'shopify'){
        data['customer']['first_name'] = body.customer.firstname;
        data['customer']['last_name'] = body.customer.lastname;
        data['customer']['email'] = body.customer.email;
        data['passsword'] = body.passsword;
        manage_data.body = data;
        manage_data.endUrl = url_path + "/customers.json";
        manage_data.method = method;
        manage_data.contentType = headers['content-type'];
        return manage_data;
    } else if(store == 'magento') {
        manage_data.endUrl = url_path + "/V1/customers";
        manage_data.body = body;
        manage_data.method = method;
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        manage_data.contentType = headers['content-type'];
        return manage_data;
    } else {
        // coming soon
    }
};

let setDetailsForLogin = async (body, headers, url_path, method, store) => {
    let manage_data = {};
    if(store == 'shopify'){
        manage_data.endUrl = url_path + "/customers/search.json?query=email:"+body.username;
        manage_data.method = "GET";
        return manage_data;
    } else if(store == 'magento') {
        manage_data.endUrl = url_path + "/V1/integration/customer/token";
        manage_data.body = body;
        manage_data.method = method;
        manage_data.app_id = headers.app_id;
        // manage_data.authorization = headers.authorization;
        manage_data.contentType = headers['content-type'];
        return manage_data;
    } else {
        // coming soon
    }
};

let setDetailsForForgotPassword = async () => {
    
};

export default {
    setDetailsForLogin,
    setDetailsForRegister,
    setDetailsForForgotPassword,
};