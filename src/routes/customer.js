import customer from '../controllers/CustomerController'

export default (app) => {

    // Route for customer login
    app.route('/login').post(customer.login);

    // Route for customer registration
    app.route('/register').post(customer.register);

    // Route for customer forgot password
    app.route('/forgot').post(customer.forgotPassword);

    // Route for customer social_account
    app.route('/social_account').post(customer.social_account);

    return app
}