import config from '../config';
let setPathForGetCategories = (async function (headers, url_path, method, store) {
    let manage_data = {};
    if(store == 'magento'){
        manage_data.endUrl = url_path + "/V1/categories";
        manage_data.method = method;
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        return manage_data;
    } else if(store == 'shopify') {
        manage_data.endUrl = url_path + "/custom_collections.json";
        manage_data.method = method;
        return manage_data;
    } else {
        // coming soon
    }
});
let setPathForGetCategoryProduct = (async function (body, headers, url_path, store) {
    let manage_data = {};
    if(store == 'magento'){
        manage_data.endUrl = url_path + "/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]="+body.category_id+"&searchCriteria[sortOrders][0][field]="+body.sortBy+"&searchCriteria[sortOrders][0][direction]="+body.sortOrder+"&searchCriteria[pageSize]="+body.pageSize+"&searchCriteria[currentPage]="+body.currentPage;
        manage_data.method = "GET";
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        return manage_data;
    } else if(store == 'shopify') {
        manage_data.endUrl = url_path + "/products.json?limit="+ body.pageSize+"&page="+ body.currentPage+"&collection_id="+ body.category_id;
        manage_data.method = "GET";
        return manage_data;
    } else {
        //coming soon
    }
});

export default {
    setPathForGetCategories,
    setPathForGetCategoryProduct
};

