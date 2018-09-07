import category from '../controllers/category'

export default (app) => {
    /* Route for User Registration  */
    app.route('/add/category').post(category.create)

    return app
}