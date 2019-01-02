import BaseAPIController from './BaseAPIController'
import CustomerProvider from '../providers/CustomerProvider';
import request from '../service/request'
import config from '../config';

export class CustomerController extends BaseAPIController {
    /* Controller for customer login  */
    login = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.setDetailsForLogin(req.body, req.headers, req.url_path, req.method, req.store);
            let loginResponse = await request.requestToServer(manage_data);
            if (req.isMagento) {
                let manageDataToGetCustomerData = await CustomerProvider.setDetailsToGetDataByAccessToken(loginResponse, req.headers, req.url_path, req.method, req.store);
                let loginResponseDetails = await request.requestToServer(manageDataToGetCustomerData);
                loginResponse = {
                    token: loginResponse
                };
                // loginResponse = Object.assign(loginResponseDetails, loginResponse);
                loginResponse = Object.assign({
                    id: loginResponseDetails["id"],
                    email: loginResponseDetails["email"],
                    firstname: loginResponseDetails["firstname"],
                    lastname: loginResponseDetails["lastname"],
                    addresses: loginResponseDetails["addresses"] ? loginResponseDetails["addresses"] : []
                }, loginResponse);

            } else if (req.isShopify) {
                if (loginResponse["customerAccessTokenCreate"]) {
                    if (loginResponse["customerAccessTokenCreate"]["userErrors"].length) {
                        throw loginResponse["customerAccessTokenCreate"]["userErrors"][0]["message"];
                    }
                }   
                let manageDataToGetCustomerData = await CustomerProvider.setDetailsToGetDataByAccessToken(loginResponse["customerAccessTokenCreate"]["customerAccessToken"]["accessToken"], req.headers, req.url_path, req.method, req.store);
                let loginResponseDetails = await request.requestToServer(manageDataToGetCustomerData);
                loginResponse = {
                    token: loginResponse["customerAccessTokenCreate"]["customerAccessToken"]["accessToken"]
                };
                let addresses = [];
                if(loginResponseDetails && (loginResponseDetails["customer"]) && (loginResponseDetails["customer"]["addresses"]) && (loginResponseDetails["customer"]["addresses"]["edges"]))
                    loginResponseDetails["customer"]["addresses"]["edges"].forEach(element => {
                        addresses.push(element["node"]);
                });               
                    loginResponse = Object.assign({
                    id: loginResponseDetails["customer"]["id"],
                    email: loginResponseDetails["customer"]["email"],
                    firstname: loginResponseDetails["customer"]["firstName"],
                    lastname: loginResponseDetails["customer"]["lastName"],
                    addresses: addresses, 
                    defaultAddress: loginResponseDetails["customer"]["defaultAddress"] ? loginResponseDetails["customer"]["defaultAddress"] : [],
                }, loginResponse);
            } else {
                throw "only magento and shopify platform supported";
            }
            this.handleSuccessResponse(res, next, loginResponse)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for customer register  */
    register = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.setDetailsForRegister(req.body, req.headers, req.url_path, req.method, req.store);
            let registerResponse = await request.requestToServer(manage_data);
            let final_data = {}
            if (req.isShopify) {
                if (registerResponse["customerCreate"]["userErrors"].length) {
                    throw registerResponse["customerCreate"]["userErrors"][0]["message"];
                }

                final_data = {
                    id: registerResponse["customerCreate"]["customer"]["id"],
                    firstname: registerResponse["customerCreate"]["customer"]["firstName"],
                    lastname: registerResponse["customerCreate"]["customer"]["lastName"],
                    email: registerResponse["customerCreate"]["customer"]["email"],
                    // addresses: registerResponse.customer.addresses
                }
            } else if (req.isMagento) {
                final_data = {
                    id: registerResponse.id,
                    firstname: registerResponse.firstname,
                    lastname: registerResponse.lastname,
                    email: registerResponse.email,
                    addresses: registerResponse.addresses
                }
            } else {
                throw "only magento and shopify platform supported";
            }
            this.handleSuccessResponse(res, next, final_data)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for customer forgotPassword  */
    forgotPassword = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.setDetailsForForgotPassword(req.body, req.params, req.headers, req.url_path, req.method, req.store);
            let forgotPasswordResponse = await request.requestToServer(manage_data);
            let final_data = {}
            if (req.isShopify) {
                if (forgotPasswordResponse["customerRecover"]["userErrors"].length) {
                    throw forgotPasswordResponse["customerRecover"]["userErrors"][0]["message"];
                }
                final_data = {
                    message: "Email with password reset link has been sent to register email id"
                }
            } else if (req.isMagento) {
                final_data = {}
            } else {
                throw "only magento and shopify platform supported";
            }
            this.handleSuccessResponse(res, next, final_data)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for customer update  */
    update = async (req, res, next) => {
        try {
            let final_data = {};
            let manage_data = await CustomerProvider.setDetailsForUpdate(req.body, req.params, req.headers, req.url_path, req.method, req.store);
            let updateResponse = await request.requestToServer(manage_data);
            if (req.isShopify) {
                if (updateResponse["customerUpdate"]["userErrors"].length) {
                    throw updateResponse["customerUpdate"]["userErrors"][0]["message"];
                }
                final_data = {
                    id: updateResponse["customerUpdate"]["customer"]["id"],
                    firstname: updateResponse["customerUpdate"]["customer"]["firstName"],
                    lastname: updateResponse["customerUpdate"]["customer"]["lastName"],
                    email: updateResponse["customerUpdate"]["customer"]["email"],
                    addresses: updateResponse["customerUpdate"]["customer"]["email"],
                }
            } else if (req.isMagento) {
                final_data = {
                    id: updateResponse.id,
                    firstname: updateResponse.firstname,
                    lastname: updateResponse.lastname,
                    email: updateResponse.email,
                    addresses: updateResponse.addresses
                }
            } else {
                throw "only magento and shopify platform supported";
            }
            this.handleSuccessResponse(res, next, final_data)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for addAddress customer*/
    addAddress = async (req, res, next) => {
        try {
            let final_data = {};
            let manage_data = await CustomerProvider.setDetailsForAddAddress(req.body, req.params, req.headers, req.url_path, req.method, req.store);
            let addAddressResponse = await request.requestToServer(manage_data);
            if (req.isShopify) {
                if (addAddressResponse["customerAddressCreate"]["userErrors"].length) {
                    throw addAddressResponse["customerAddressCreate"]["userErrors"][0]["message"];
                }
                final_data = {
                    addressId: addAddressResponse["customerAddressCreate"]["customerAddress"]["id"],
                    firstname: addAddressResponse["customerAddressCreate"]["customerAddress"]["firstName"],
                    lastname: addAddressResponse["customerAddressCreate"]["customerAddress"]["lastName"],
                    address1: addAddressResponse["customerAddressCreate"]["customerAddress"]["address1"],
                    address2: addAddressResponse["customerAddressCreate"]["customerAddress"]["address2"],
                    city: addAddressResponse["customerAddressCreate"]["customerAddress"]["city"],
                    company: addAddressResponse["customerAddressCreate"]["customerAddress"]["company"],
                    country: addAddressResponse["customerAddressCreate"]["customerAddress"]["country"],
                    phone: addAddressResponse["customerAddressCreate"]["customerAddress"]["phone"],
                    province: addAddressResponse["customerAddressCreate"]["customerAddress"]["province"],
                    zip: addAddressResponse["customerAddressCreate"]["customerAddress"]["zip"],
                }
            } else if (req.isMagento) {
                final_data = {
                    addressId: addAddressResponse["addresses"][0]["id"],
                    customerId: addAddressResponse["addresses"][0]["customer_id"],
                    firstname: addAddressResponse["addresses"][0]["firstname"],
                    lastname: addAddressResponse["addresses"][0]["lastname"],
                    address1: addAddressResponse["addresses"][0]["street"][0],
                    address2: addAddressResponse["addresses"][0]["street"][1],
                    city: addAddressResponse["addresses"][0]["city"],
                    company: addAddressResponse["addresses"][0]["company"],
                    country: addAddressResponse["addresses"][0]["country"],
                    countryId: addAddressResponse["addresses"][0]["country_id"],
                    phone: addAddressResponse["addresses"][0]["telephone"],
                    province: addAddressResponse["addresses"][0]["region"]["region"],
                    provinceCode: addAddressResponse["addresses"][0]["region"]["region_code"],
                    provinceId: addAddressResponse["addresses"][0]["region"]["region_id"],
                    zip: addAddressResponse["addresses"][0]["postcode"],
                }
            } else {
                throw "only magento and shopify platform supported";
            }
            this.handleSuccessResponse(res, next, final_data)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for updateAddress customer  */
    updateAddress = async (req, res, next) => {
        try {
            let final_data = {};
            let manage_data = await CustomerProvider.setDetailsForUpdateAddress(req.body, req.params, req.headers, req.url_path, req.method, req.store);
            let updateAddressResponse = await request.requestToServer(manage_data);
            if (req.isShopify) {
                if (updateAddressResponse["customerAddressUpdate"]["userErrors"].length) {
                    throw updateAddressResponse["customerAddressUpdate"]["userErrors"][0]["message"];
                }
                final_data = {
                    id: updateAddressResponse["customerAddressUpdate"]["customerAddress"]["id"],
                    firstname: updateAddressResponse["customerAddressUpdate"]["customerAddress"]["firstName"],
                    lastname: updateAddressResponse["customerAddressUpdate"]["customerAddress"]["lastName"],
                    address1: updateAddressResponse["customerAddressUpdate"]["customerAddress"]["address1"],
                    address2: updateAddressResponse["customerAddressUpdate"]["customerAddress"]["address2"],
                    city: updateAddressResponse["customerAddressUpdate"]["customerAddress"]["city"],
                    company: updateAddressResponse["customerAddressUpdate"]["customerAddress"]["company"],
                    country: updateAddressResponse["customerAddressUpdate"]["customerAddress"]["country"],
                    phone: updateAddressResponse["customerAddressUpdate"]["customerAddress"]["phone"],
                    province: updateAddressResponse["customerAddressUpdate"]["customerAddress"]["province"],
                    zip: updateAddressResponse["customerAddressUpdate"]["customerAddress"]["zip"],
                }
            } /*else if (req.isMagento) {
                final_data = {
                    id: updateResponse.id,
                    firstname: updateResponse.firstname,
                    lastname: updateResponse.lastname,
                    email: updateResponse.email,
                    addresses: updateResponse.addresses
                }
            }*/ else {
                throw "only magento and shopify platform supported";
            }
            this.handleSuccessResponse(res, next, final_data)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for set customer default address  */
    setDefaultAddress = async (req, res, next) => {
        try {
            let final_data = {};
            let manage_data = await CustomerProvider.setDetailsForSetDefaultAddress(req.body, req.params, req.headers, req.url_path, req.method, req.store);
            let setDefaultAddressResponse = await request.requestToServer(manage_data);
            if (req.isShopify) {
                if (setDefaultAddressResponse["customerDefaultAddressUpdate"]["userErrors"].length) {
                    throw setDefaultAddressResponse["customerDefaultAddressUpdate"]["userErrors"][0]["message"];
                }
                final_data = {
                    id: setDefaultAddressResponse["customerDefaultAddressUpdate"]["customer"]["id"],
                    firstname: setDefaultAddressResponse["customerDefaultAddressUpdate"]["customer"]["firstName"],
                    lastname: setDefaultAddressResponse["customerDefaultAddressUpdate"]["customer"]["lastName"],
                    email: setDefaultAddressResponse["customerDefaultAddressUpdate"]["customer"]["email"],
                    defaultAddress: setDefaultAddressResponse["customerDefaultAddressUpdate"]["customer"]["defaultAddress"]
                }
            } /*else if (req.isMagento) {
                final_data = {
                    id: updateResponse.id,
                    firstname: updateResponse.firstname,
                    lastname: updateResponse.lastname,
                    email: updateResponse.email,
                    addresses: updateResponse.addresses
                }
            }*/ else {
                throw "only magento and shopify platform supported";
            }
            this.handleSuccessResponse(res, next, final_data)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for delete customer address  */
    deleteAddress = async (req, res, next) => {
        try {
            let final_data = {};
            let manage_data = await CustomerProvider.setDetailsForDeleteAddress(req.body, req.params, req.headers, req.url_path, req.method, req.store);
            let deleteAddressResponse = await request.requestToServer(manage_data);

            if (req.isShopify) {
                if (deleteAddressResponse["customerAddressDelete"]["userErrors"].length) {
                    throw deleteAddressResponse["customerAddressDelete"]["userErrors"][0]["message"];
                }
                final_data = {
                    deletedCustomerAddressId: deleteAddressResponse["customerAddressDelete"]["deletedCustomerAddressId"]
                }
            } /*else if (req.isMagento) {
                final_data = {
                    id: updateResponse.id,
                    firstname: updateResponse.firstname,
                    lastname: updateResponse.lastname,
                    email: updateResponse.email,
                    addresses: updateResponse.addresses
                }
            }*/ else {
                throw "only magento and shopify platform supported";
            }
            this.handleSuccessResponse(res, next, final_data)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }
}

const controller = new CustomerController()
export default controller