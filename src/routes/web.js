import web from '../controllers/WebController'

export default (app) => {
    // Route for web config
    app.route('/web/config').get(web.config);

    // Route for allowed countries
    app.route('/web/getAllowedCountries').get(web.getAllowedCountries);

    return app
}