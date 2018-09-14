import BaseAPIController from './BaseAPIController'
import CustomerProvider from '../providers/CustomerProvider';
import request from '../service/request'
import config from '../config';

export class CustomerController extends BaseAPIController {
    /* Controller for customer login  */
    login = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.setDetailsForLogin(req.body, req.headers, req.url_path, req.method, req.store);
            let login = await request.requestToServer(manage_data);
            if(req.isMagento){
                manage_data.endUrl = req.url_path + "/V1/customers/me";
                manage_data.authorization = "Bearer "+login;
                manage_data.method = "GET"; 
                delete manage_data.contentType;
                let loginDetails = await request.requestToServer(manage_data);
                // loginDetails.token = login;
                login={token:login};
                login = Object.assign(loginDetails, login);
            } else {
                login = login.customers[0];
            }
            this.handleSuccessResponse(res, next, login)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for customer register  */
    register = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.setDetailsForRegister(req.body, req.headers, req.url_path, req.method, req.store);
            let register = await request.requestToServer(manage_data);
            let final_data = {}
            if(req.isShopify){
                final_data = {
                    id: register.customer.id,
                    firstname: register.customer.first_name,
                    lastname: register.customer.last_name,
                    email: register.customer.email,
                    addresses: register.customer.addresses
                }
            }else {
                final_data = {
                    id:register.id,
                    firstname: register.firstname,
                    lastname: register.lastname,
                    email: register.email,
                    addresses: register.addresses
                }
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
}

const controller = new CustomerController()
export default controller