import products from '../controllers/products';
import middleware from '../middleware/auth.js'

export default (app) => {

    // Route for get one product

    app.route('/products/:sku').get(middleware.appData, products.getOneProduct);

    return app
}