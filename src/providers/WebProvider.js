let config = (async function (req) {
    // req.body = {secret: 'optional'};
    req.endPoint = '/excellence/mobile/api/v1/web/config';
});
let getAllowedCountries = (async function (req) {
    req.endPoint = '/rest/V1/directory/countries';
});

export default {
    config,
    getAllowedCountries
};

