import BaseAPIController from './BaseAPIController'
import CategoryProvider from '../providers/CategoryProvider'
import request from '../service/request'

export class CategoryController extends BaseAPIController {

    /* Controller for get all categories*/
    getAllCategoryies = async (req, res, next) => {
        try {
            // let manage_data = await CustomerProvider.getAllCategoryies(req);
            let getAllCategoryies = await request.API(req);
            this.handleSuccessResponse(res, next, getAllCategoryies)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }
}
    
const controller = new CategoryController()
export default controller