import BaseAPIController from './BaseAPIController'
import CategoryProvider from '../providers/CategoryProvider'
import request from '../service/request'

export class CategoryController extends BaseAPIController {

    /* Controller for get all categories*/
    getAllCategories = async (req, res, next) => {
        try {
            let manage_data = await CategoryProvider.getAllCategoryies(req);
            let getAllCategories = await request.API(req);
            this.handleSuccessResponse(res, next, getAllCategories)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for get product for a category*/
    categoryProduct = async (req, res, next) => {
        try {
            let manage_data = await CategoryProvider.categoryProduct(req);
            let categoryProduct = await request.API(req);
            this.handleSuccessResponse(res, next, categoryProduct)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }
}
    
const controller = new CategoryController()
export default controller