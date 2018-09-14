import BaseAPIController from './BaseAPIController'
import WebProvider from '../providers/WebProvider';
import request from '../service/request'

export class WebController extends BaseAPIController {
    /* Controller for Web config  */
    config = async (req, res, next) => {
        try {
            let manage_data = await WebProvider.setPathForConfigPage(req.method, req.isMagento);
            let web_config = await request.requestToServer(manage_data);
            this.handleSuccessResponse(res, next, web_config)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for allowed countries  */
    getAllowedCountries = async (req, res, next) => {
        try {
            let manage_data = await WebProvider.setPathForGetAllowedCountries(req.method, req.isMagento);
            let allowedCountries = await request.requestToServer(manage_data);
            this.handleSuccessResponse(res, next, allowedCountries)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

}

const controller = new WebController()
export default controller