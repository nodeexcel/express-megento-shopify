import BaseAPIController from './BaseAPIController'
import CategoryProvider from '../providers/CategoryProvider'
import request from '../service/request'
export class CategoryController extends BaseAPIController {

    /* Controller for get all categories*/
    getAllCategories = async (req, res, next) => {
        try {
            let manage_data = await CategoryProvider.setPathForGetCategories(req.headers, req.method, req.isMagento);
            let getAllCategories = await request.requestToServer(manage_data);
            this.handleSuccessResponse(res, next, getAllCategories)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for get product for a category*/
    categoryProduct = async (req, res, next) => {
        try {
            let manage_data = await CategoryProvider.setPathForGetCategoryProduct(req.body, req.headers, req.isMagento);
            let categoryProduct = await request.requestToServer(manage_data);
            if(req.isMagento){
                categoryProduct['items'].forEach((value, key) => {
                    var imageLink = value.custom_attributes.find((details) => {
                        if(details.attribute_code == "image"){
                            return details.value;
                        }
                    })
                    categoryProduct.items[key].imageLink = imageLink.value;
                })
            }
            this.handleSuccessResponse(res, next, categoryProduct)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }
}
    
const controller = new CategoryController()
export default controller