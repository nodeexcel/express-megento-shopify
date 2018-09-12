let getAllCategoryies = (async function (req) {
    if(req.api_end_point_server == 'magento'){
        req.endUrl = req.url_path + "/V1/categories";
    } else {
        req.endUrl = req.url_path + "";
    }
});
let categoryProduct = (async function (req) {
    if(req.api_end_point_server == 'magento'){
        console.log(req.query.searchCriteria.filter_groups[0].filters[0].field);
        req.endUrl = req.url_path + "/V1/products?searchCriteria[filter_groups][0][filters][0][field]="+req.query.searchCriteria.filter_groups[0].filters[0].field+"&searchCriteria[filter_groups][0][filters][0][value]="+req.query.searchCriteria.filter_groups[0].filters[0].value+"&searchCriteria[sortOrders][0][field]="+req.query.searchCriteria.sortOrders[0].field+"&searchCriteria[sortOrders][0][direction]="+req.query.searchCriteria.sortOrders[0].direction+"&searchCriteria[pageSize]="+req.query.searchCriteria.pageSize+"&searchCriteria[currentPage]="+req.query.searchCriteria.currentPage;
    } else {
        req.endUrl = req.url_path + "";
    }
});

export default {
    getAllCategoryies,
    categoryProduct
};

