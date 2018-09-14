import config from '../config';
let setPathForConfigPage = (async function (method, url_path, store) {
    let manage_data = {};
    if(store == 'magento'){
        manage_data.endPoint = url_path + '/excellence/mobile/api/v1/web/config';
        manage_data.method = method;
        return manage_data;
    }
});
let setPathForGetAllowedCountries = (async function (method, url_path, store) {
    let manage_data = {};
    if(store == 'magento'){
        manage_data.endPoint = url_path + '/rest/V1/directory/countries';;
        manage_data.method = method;
        return manage_data;
    }
});

export default {
    setPathForConfigPage,
    setPathForGetAllowedCountries
};

