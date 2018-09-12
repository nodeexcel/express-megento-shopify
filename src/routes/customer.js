import customer from '../controllers/CustomerController';
import middleware from '../middleware/auth.js'

export default (app) => {

    // Route for customer login
    app.route('/customer/login').post(middleware.appData, customer.login);

    // Route for customer registration
    app.route('/customer/register').post( middleware.appData, customer.register);

    // Route for customer forgot password
    app.route('/customer/forgot').put(customer.forgotPassword);

    // Route for customer social_account
    app.route('/customer/social_account').post(customer.social_account);

    return app
}