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
                let manageDataToGetCustomerData = await CustomerProvider.setDetailsToGetDataByAccessToken(loginResponse, req.url_path, req.method, req.store);
                let loginResponseDetails = await request.requestToServer(manageDataToGetCustomerData);
                loginResponse = {
                    token: loginResponse
                };
                loginResponse = Object.assign(loginResponseDetails, loginResponse);
            } else if (req.isShopify) {
                if (loginResponse["customerAccessTokenCreate"]) {
                    if (loginResponse["customerAccessTokenCreate"]["userErrors"].length) {
                        throw loginResponse["customerAccessTokenCreate"]["userErrors"][0]["message"];
                    }
                }   
                let manageDataToGetCustomerData = await CustomerProvider.setDetailsToGetDataByAccessToken(loginResponse["customerAccessTokenCreate"]["customerAccessToken"]["accessToken"], req.url_path, req.method, req.store);
                let loginResponseDetails = await request.requestToServer(manageDataToGetCustomerData);

                loginResponse = {
                    token: loginResponse["customerAccessTokenCreate"]["customerAccessToken"]["accessToken"]
                };
                loginResponse = Object.assign({
                    id: loginResponseDetails["customer"]["id"],
                    email: loginResponseDetails["customer"]["email"],
                    firstname: loginResponseDetails["customer"]["firstName"],
                    lastname: loginResponseDetails["customer"]["lastName"]
                }, loginResponse);
            } else {
                // coming soon
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
                if (registerResponse["customerCreate"] == null) {
                    throw "please try again ";
                }
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
                // comming soon
            }
            this.handleSuccessResponse(res, next, final_data)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for customer forgotPassword  */
    forgotPassword = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.setDetailsForForgotPassword();
            let forgotPassword = await request.requestToServer(manage_data);
            this.handleSuccessResponse(res, next, forgotPassword)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for customer update  */
    update = async (req, res, next) => {
        console.log(req)
        try {
            let manage_data = await CustomerProvider.setDetailsForUpdate(req.body, req.params, req.headers, req.url_path, req.method, req.store);
            let update = await request.requestToServer(manage_data);
            let final_data = update;
            this.handleSuccessResponse(res, next, final_data)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }
}

const controller = new CustomerController()
export default controller