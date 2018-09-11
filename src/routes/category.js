import category from '../controllers/CategoryController'
import middleware from '../middleware/auth.js'

export default (app) => {
    /* Route for get all categories  */
    app.route('/category/getAllCategoryies').get(middleware.appData, middleware.apiRoute, category.getAllCategoryies)

    return app
}