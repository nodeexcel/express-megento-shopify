import customer from '../controllers/CustomerController';
import middleware from '../middleware/auth.js'

export default (app) => {

    // Route for customer login
    app.route('/customer/login').post(middleware.appData, customer.login);

    // Route for customer registration
    app.route('/customer/register').post( middleware.appData, customer.register);

    // Route for customer forgot password
    app.route('/customer/forgotPassword').put( middleware.appData, customer.forgotPassword);

    // Route for customer update
    app.route('/customer/update/:id').put( middleware.appData, customer.update);
    
    return app
}