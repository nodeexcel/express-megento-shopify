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

    // Route for add customer address
    app.route('/customer/addAddress/:id').post( middleware.appData, customer.addAddress);

    // Route for update customer address
    app.route('/customer/updateAddress/:id').post( middleware.appData, customer.updateAddress);

    // Route for set customer default address
    app.route('/customer/setDefaultAddress/:id').post( middleware.appData, customer.setDefaultAddress);

    // Route for set customer default address
    app.route('/customer/deleteAddress/:id').post( middleware.appData, customer.deleteAddress);
    
    return app
}