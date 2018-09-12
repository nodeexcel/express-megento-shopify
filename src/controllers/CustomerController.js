import BaseAPIController from './BaseAPIController'
import CustomerProvider from '../providers/CustomerProvider';
import request from '../service/request'

export class CustomerController extends BaseAPIController {
    /* Controller for customer login  */
    login = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.login(req);
            let login = await request.API(req);
            if(req.api_end_point_server == 'magento'){
                req.endUrl = req.url_path+ "/V1/customers/me";
                req.headers.authorization = "Bearer "+login;
                req.method = "get"; 
                let loginDetails = await request.API(req);
                // loginDetails.token = login;
                login={token:login};
                login = Object.assign(loginDetails, login);
            }
            this.handleSuccessResponse(res, next, login)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for customer register  */
    register = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.register(req);
            let register = await request.API(req);
            let final_data = {}
            if(req.api_end_point_server == 'shopify' && register.customer){
                final_data = {
                    id: register.customer.id,
                    firstname: register.customer.first_name,
                    lastname: register.customer.last_name,
                    email: register.customer.email,
                    addresses: register.customer.addresses
                }
            }else if(register.id){
                final_data = {
                    id:register.id,
                    firstname: register.firstname,
                    lastname: register.lastname,
                    email: register.email,
                    addresses: register.addresses
                }
            }else{
                final_data = register
            }
            // console.log(register)
            this.handleSuccessResponse(res, next, final_data)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for customer forgotPassword  */
    forgotPassword = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.forgotPassword(req);
            let forgotPassword = await request.API(req);
            this.handleSuccessResponse(res, next, forgotPassword)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for customer social_account  */
    social_account = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.social_account(req);
            let social_account = await request.API(req);
            this.handleSuccessResponse(res, next, social_account)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }
}

const controller = new CustomerController()
export default controller