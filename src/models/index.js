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

    let categories = mongoose.Schema({}, {
        collection: "categories",
        strict: false,
        timestamps: false
    });

    let articles = mongoose.Schema({}, {
        collection: 'articles',
        strict: false
    })

    return function(req, res, next) {
        req.category = conn.model("categories", categories);
        req.articles = conn.model('articles', articles);
        req.appData = conn.model('appData', appData);
        next();
    };
};