import mongoose from "mongoose";

let db = 'taskular';
let conn = mongoose.createConnection("mongodb://localhost/" + db);

// the middleware function
module.exports = function() {

    // create schema
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
        next();
    };
};