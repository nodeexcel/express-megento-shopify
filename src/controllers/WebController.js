import BaseAPIController from './BaseAPIController'
import WebProvider from '../providers/WebProvider';
import request from '../service/request'

export class WebController extends BaseAPIController {
    /* Controller for Web config  */
    config = async (req, res, next) => {
        try {
            let manage_data = await WebProvider.config(req);
            let web_config = await request.API(req);
            this.handleSuccessResponse(res, next, web_config)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for allowed countries  */
    getAllowedCountries = async (req, res) => {
        try {
            let allowedCountries = await request.API(req);
            this.handleSuccessResponse(res, next, allowedCountries)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

}

const controller = new WebController()
export default controller