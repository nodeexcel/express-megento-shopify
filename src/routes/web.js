import web from '../controllers/WebController'

export default (app) => {
    // Route for web config
    app.route('/config').post(web.config);

    // Route for allowed countries
    app.route('/getAllowedCountries').get(web.getAllowedCountries);

    return app
}