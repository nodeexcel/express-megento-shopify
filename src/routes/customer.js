import customer from '../controllers/CustomerController';
import middleware from '../middleware/auth.js'

export default (app) => {

    // Route for customer login
    app.route('/customer/login').post(customer.login);

    // Route for customer registration
    app.route('/customer/register').post( middleware.appData,middleware.apiRoute,customer.register);

    // Route for customer forgot password
    app.route('/customer/forgot').put(customer.forgotPassword);

    // Route for customer social_account
    app.route('/customer/social_account').post(customer.social_account);

    // Route for customer delete_account
    app.route('/customer/delete_account').delete(customer.delete_account);


    return app
}