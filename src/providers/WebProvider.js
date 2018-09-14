import config from '../config';
let setPathForConfigPage = (async function (method, isMagento) {
    let manage_data = {};
    if(isMagento){
        manage_data.endPoint = config.magentoUrl + '/excellence/mobile/api/v1/web/config';
        manage_data.method = method;
        return manage_data;
    }
});
let setPathForGetAllowedCountries = (async function (method, isMagento) {
    let manage_data = {};
    if(isMagento){
        manage_data.endPoint = config.magentoUrl + '/rest/V1/directory/countries';;
        manage_data.method = method;
        return manage_data;
    }
});

export default {
    setPathForConfigPage,
    setPathForGetAllowedCountries
};

