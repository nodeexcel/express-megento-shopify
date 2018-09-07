import BaseAPIController from './BaseAPIController'
import CategoryProvider from '../providers/CategoryProvider.js'

export class CategoryController extends BaseAPIController {
    /* Controller for User Register  */
    create = (req, res) => {
    	req.category.create(req.body).then((data)=>{
    		res.json(data)
    	})
    }
}

const controller = new CategoryController()
export default controller