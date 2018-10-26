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
        manage_data.storefrontAccessToken = headers.storefrontAccessToken;
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
        throw "only magento and shopify platform supported";
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
        manage_data.storefrontAccessToken = headers.storefrontAccessToken;
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
        throw "only magento and shopify platform supported";
    }
};

let setDetailsForForgotPassword = async (body, params, headers, url_path, method, store) => {
    let manage_data = {};
    if (store == 'shopify') {
        manage_data.body = `mutation {
            customerRecover(email: "${body.email}") {
              userErrors {
                field
                message
              }
            }
          }`;
        manage_data.endUrl = url_path;
        manage_data.method = "POST";
        manage_data.contentType = "application/graphql";
        manage_data.storefrontAccessToken = headers.storefrontAccessToken;
        return manage_data;
    } else if (store == 'magento') {
        manage_data.endUrl = url_path + "/V1/customers/password";
        manage_data.body = {
            "email": body.email,
            "template": "template",
            "websiteId": 0
          };
        manage_data.method = "PUT";
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        manage_data.contentType = headers['content-type'];
    } else {
        throw "only magento and shopify platform supported";
    }
};

let setDetailsForUpdate = async (body, params, headers, url_path, method, store) => {
    let manage_data = {};
    let data = {
        customer: {}
    }
    if (store == 'shopify') {
        manage_data.body = `mutation {
            customerUpdate(customerAccessToken: "${headers.token}", customer:{
              ${body.customer.firstname ? `firstName: "${body.customer.firstname}",` : `` }
              ${body.customer.lastname ? `lastName: "${body.customer.lastname}",` : `` }
              ${body.customer.email ? `email: "${body.customer.email}",` : `` }
              ${body.customer.phone ? `phone: "${body.customer.phone}",` : `` }
              ${body.customer.acceptsMarketing ? `acceptsMarketing: "${body.customer.acceptsMarketing}"` : `` }
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
        manage_data.method = "POST";
        manage_data.contentType = "application/graphql";
        manage_data.storefrontAccessToken = headers.storefrontAccessToken;
        return manage_data;
    } else if (store == 'magento') {
        manage_data.endUrl = url_path + "/V1/customers/" + params.id;
        manage_data.body = body;
        manage_data.method = method;
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        manage_data.contentType = headers['content-type'];
        return manage_data;
    } else {
        throw "only magento and shopify platform supported";
    }
};

let setDetailsToGetDataByAccessToken = async (token, headers, url_path, method, store) => {
    let manage_data = {};
    if (store == 'shopify') {
        manage_data.body = `{
                                customer(customerAccessToken: "${token}") {
                                    id
                                    email
                                    firstName
                                    lastName
                                    defaultAddress{
                                        formatted(withCompany: true
                                            withName: true)
                                    }

                                }
                            }`;
        manage_data.endUrl = url_path;
        manage_data.method = method;
        manage_data.contentType = "application/graphql";
        manage_data.storefrontAccessToken = headers.storefrontAccessToken;
        return manage_data;

    } else if (store == 'magento') {
        manage_data.endUrl = url_path + "/V1/customers/me";
        manage_data.authorization = "Bearer " + token;
        manage_data.method = "GET";
        return manage_data;

    } else {
        throw "only magento and shopify platform supported";
    }
};


let setDetailsForAddAddress = async (body, params, headers, url_path, method, store) => {
    let manage_data = {};
    if (store == 'shopify') {
        manage_data.body = `mutation {
            customerAddressCreate(customerAccessToken: "${headers.token}", address: {
            ${body.customer.address1 ? `address1: "${body.customer.address1}",` : `` }
            ${body.customer.address2 ? `address2: "${body.customer.address2}",` : `` }
            ${body.customer.city ? `city: "${body.customer.city}",` : `` }
            ${body.customer.company ? `company: "${body.customer.company}",` : `` }
            ${body.customer.country ? `country: "${body.customer.country}",` : `` }
            ${body.customer.firstname ? `firstName: "${body.customer.firstname}",` : `` }
            ${body.customer.lastname ? `lastName: "${body.customer.lastname}",` : `` }
            ${body.customer.phone ? `phone: "${body.customer.phone}",` : `` }
            ${body.customer.province ? `province: "${body.customer.province}",` : `` }
            ${body.customer.zip ? `zip: "${body.customer.zip}",` : `` }
          }) {
              userErrors {
                field
                message
              }
              customerAddress {
                id
                address1
                address2
                city
                company
                country
                firstName
                lastName
                phone
                province
                zip
                provinceCode
                latitude
                longitude
                name
                formattedArea
                formatted(withCompany: true
                    withName: true)
                countryCodeV2
                countryCode
              }
            }
          }`;
        manage_data.endUrl = url_path;
        manage_data.method = "POST";
        manage_data.contentType = "application/graphql";
        manage_data.storefrontAccessToken = headers.storefrontAccessToken;
        return manage_data;

    } else if (store == 'magento') {
        manage_data.endUrl = url_path + "/V1/customers/me";
        manage_data.authorization = "Bearer " + token;
        manage_data.method = "GET";
        return manage_data;

    } else {
        throw "only magento and shopify platform supported";
    }
};

let setDetailsForUpdateAddress = async (body, params, headers, url_path, method, store) => {
    let manage_data = {};
    if (store == 'shopify') {
        manage_data.body = `mutation {
            customerAddressCreate(customerAccessToken: "${headers.token}", address: {
            ${body.customer.address1 ? `address1: "${body.customer.address1}",` : `` }
            ${body.customer.address2 ? `address2: "${body.customer.address2}",` : `` }
            ${body.customer.city ? `city: "${body.customer.city}",` : `` }
            ${body.customer.company ? `company: "${body.customer.company}",` : `` }
            ${body.customer.country ? `country: "${body.customer.country}",` : `` }
            ${body.customer.firstname ? `firstName: "${body.customer.firstname}",` : `` }
            ${body.customer.lastname ? `lastName: "${body.customer.lastname}",` : `` }
            ${body.customer.phone ? `phone: "${body.customer.phone}",` : `` }
            ${body.customer.province ? `province: "${body.customer.province}",` : `` }
            ${body.customer.zip ? `zip: "${body.customer.zip}",` : `` }
          }) {
              userErrors {
                field
                message
              }
              customerAddress {
                id
                address1
                address2
                city
                company
                country
                firstName
                lastName
                phone
                province
                zip
                provinceCode
                latitude
                longitude
                name
                formattedArea
                formatted(withCompany: true
                    withName: true)
                countryCodeV2
                countryCode
              }
            }
          }`;
        manage_data.endUrl = url_path;
        manage_data.method = "POST";
        manage_data.contentType = "application/graphql";
        manage_data.storefrontAccessToken = headers.storefrontAccessToken;
        return manage_data;

    } else if (store == 'magento') {
        manage_data.endUrl = url_path + "/V1/customers/me";
        manage_data.authorization = "Bearer " + token;
        manage_data.method = "GET";
        return manage_data;

    } else {
        throw "only magento and shopify platform supported";
    }
};


export default {
    setDetailsForLogin,
    setDetailsForRegister,
    setDetailsForForgotPassword,
    setDetailsForUpdate,
    setDetailsToGetDataByAccessToken,
    setDetailsForAddAddress,
    setDetailsForUpdateAddress
};