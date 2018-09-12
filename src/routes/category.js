import category from '../controllers/CategoryController'
import middleware from '../middleware/auth.js'

export default (app) => {
    /* Route for get all categories  */
    app.route('/category/getAllCategories').get(middleware.appData, category.getAllCategories)

    /* Route for get product for a category  */
    app.route('/category/categoryProduct').post(middleware.appData, category.categoryProduct)

    return app
}