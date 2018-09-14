import config from '../config';
let setPathForGetCategories = (async function (headers, method, isMagento) {
    let manage_data = {};
    if(isMagento){
        manage_data.endUrl = config.magentoUrl + "/V1/categories";
        manage_data.method = method;
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        return manage_data;
    } else {
        manage_data.endUrl = config.shopifyUrl + "/custom_collections.json";
        manage_data.method = method;
        return manage_data;
    }
});
let setPathForGetCategoryProduct = (async function (body, headers, isMagento) {
    let manage_data = {};
    if(isMagento){
        manage_data.endUrl = config.magentoUrl + "/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]="+body.category_id+"&searchCriteria[sortOrders][0][field]="+body.sortBy+"&searchCriteria[sortOrders][0][direction]="+body.sortOrder+"&searchCriteria[pageSize]="+body.pageSize+"&searchCriteria[currentPage]="+body.currentPage;
        manage_data.method = config.getMethod;
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        return manage_data;
    } else {
        manage_data.endUrl = req.url_path + "/products.json?limit="+req.body.pageSize+"&page="+req.body.currentPage+"&collection_id="+req.body.category_id;
        manage_data.method = config.getMethod;
        return manage_data;
    }
});

export default {
    setPathForGetCategories,
    setPathForGetCategoryProduct
};

