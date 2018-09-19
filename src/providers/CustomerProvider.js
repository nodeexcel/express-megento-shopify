import config from '../config';
let setDetailsForRegister = async (body, headers, url_path, method, store) => {
    let manage_data = {};
    if(store == 'shopify'){
        manage_data.body = `mutation {
            customerCreate(input: {
              firstName: ${body.customer.firstname},
              lastName: ${body.customer.lastname},
              email: ${body.customer.email},
              password: ${body.passsword}
            }) {
              userErrors {
                field
                message
              }
              customer {
                id
              }
            }
          }`;
        manage_data.endUrl = url_path;
        manage_data.method = method;
        manage_data.contentType = ;
        manage_data.storefrontAccessToken = config.storefrontAccessToken;
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

let setDetailsForUpdate = async (body, params, headers, url_path, method, store) => {
    let manage_data = {};
    let data = {customer:{}}
    if(store == 'shopify'){
        // return manage_data;
    } else if(store == 'magento') {
        manage_data.endUrl = url_path + "/V1/customers/"+params.id;
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


export default {
    setDetailsForLogin,
    setDetailsForRegister,
    setDetailsForForgotPassword,
    setDetailsForUpdate,
};