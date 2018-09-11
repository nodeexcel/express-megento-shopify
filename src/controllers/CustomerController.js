import BaseAPIController from './BaseAPIController'
import CustomerProvider from '../providers/CustomerProvider';
import request from '../service/request'

export class CustomerController extends BaseAPIController {
    /* Controller for customer login  */
    login = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.login(req);
            let login = await request.API(req);
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
            this.handleSuccessResponse(res, next, register)
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
    /* Controller for customer delete_account  */
    delete_account = async (req, res, next) => {
        try {
            let manage_data = await CustomerProvider.delete_account(req);
            let delete_account = await request.API(req);
            this.handleSuccessResponse(res, next, delete_account)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }
}

const controller = new CustomerController()
export default controller