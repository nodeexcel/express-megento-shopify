import config from '../config';
let setDetailsForRegister = async (body, headers, url_path, method, store) => {
    let manage_data = {};
    if (store == 'shopify') {
        manage_data.body = `mutation {
            customerCreate(input: {
              firstName: "${body.customer.firstname}",
              lastName: "${body.customer.lastname}",
              email: "${body.customer.email}",
              password: "${body.password}",
            }) {
              userErrors {
                field
                message
              }
              customer {
                id
                email
                firstName
                lastName
              }
            }
          }`;
        manage_data.endUrl = url_path;
        manage_data.method = method;
        manage_data.contentType = "application/graphql";
        manage_data.storefrontAccessToken = config.storefrontAccessToken;
        return manage_data;
    } else if (store == 'magento') {
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
    if (store == 'shopify') {
        manage_data.body = `mutation {
            customerAccessTokenCreate(input: {
                email: "${body.username}",
                password: "${body.password}"
              }) {
              userErrors {
                field
                message
              }
              customerAccessToken {
                accessToken
                expiresAt
              }
              customerUserErrors {
                field
                message
              }
            }
          }`;
        manage_data.endUrl = url_path;
        manage_data.method = method;
        manage_data.contentType = "application/graphql";
        manage_data.storefrontAccessToken = config.storefrontAccessToken;
        return manage_data;
    } else if (store == 'magento') {
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
    let data = {
        customer: {}
    }
    if (store == 'shopify') {
        // return manage_data;
    } else if (store == 'magento') {
        manage_data.endUrl = url_path + "/V1/customers/" + params.id;
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

let setDetailsToGetDataByAccessToken = async (token, url_path, method, store) => {
    let manage_data = {};
    if (store == 'shopify') {
        manage_data.body = `{
                                customer(customerAccessToken: "${token}") {
                                    id
                                    email
                                    firstName
                                    lastName
                                }
                            }`;
        manage_data.endUrl = url_path;
        manage_data.method = method;
        manage_data.contentType = "application/graphql";
        manage_data.storefrontAccessToken = config.storefrontAccessToken;
        return manage_data;

    } else if (store == 'magento') {
        manage_data.endUrl = url_path + "/V1/customers/me";
        manage_data.authorization = "Bearer " + token;
        manage_data.method = "GET";
        // manage_data.app_id = headers.app_id;

        // manage_data.endUrl = url_path + "/V1/integration/customer/token";
        // manage_data.body = body;
        // manage_data.method = method;
        // manage_data.authorization = headers.authorization;
        // delete manage_data.contentType;

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
    setDetailsToGetDataByAccessToken
};