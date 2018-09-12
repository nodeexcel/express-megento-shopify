import mongoose from "mongoose";

let db = 'express-magento-shopify';
let conn = mongoose.createConnection("mongodb://localhost/" + db);

// the middleware function
module.exports = function() {

    // create schema
    let appData = mongoose.Schema({}, {
        collection: "appData",
        strict: false,
        timestamps: false
    });

    return function(req, res, next) {
        req.appData = conn.model('appData', appData);
        next();
    };
};