let getAllCategoryies = (async function (req) {
    if(req.api_end_point_server == 'magento'){
        req.endUrl = req.url_path + "/V1/categories";
    } else {
        req.endUrl = req.url_path + "/custom_collections.json";
        delete req.headers.authorization;
    }
});
let categoryProduct = (async function (req) {
    if(req.api_end_point_server == 'magento'){
        req.endUrl = req.url_path + "/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]="+req.body.category_id+"&searchCriteria[sortOrders][0][field]="+req.body.sortBy+"&searchCriteria[sortOrders][0][direction]="+req.body.sortOrder+"&searchCriteria[pageSize]="+req.body.pageSize+"&searchCriteria[currentPage]="+req.body.currentPage;
        req.method = "get";
    } else {
        req.endUrl = req.url_path + "/products.json?limit="+req.body.pageSize+"&page="+req.body.currentPage+"&collection_id="+req.body.category_id;
        delete req.headers.authorization;        
        req.method = "get";
    }
});

export default {
    getAllCategoryies,
    categoryProduct
};

