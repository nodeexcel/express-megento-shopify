import request from 'request'
import config from '../config'
let API = async (req) => {
    try {
        request({
            // protocol: 'http:',
            // url: `${config.url}/Magento-CE-2.1.9_sample_data-2017-09-13-03-48-19/index.php/rest`+req.originalUrl,
            // url:"https://www.google.com",
            method: req.method,
            headers: {
                APP_ID: req.headers.app_id,
                "Authorization": req.headers.authorization,
                'Content-Type': 'application/json',
            },
            timeout: 10000,
            body: JSON.stringify(req.body)
        }, function (error, result, body) {
            if (error) {
                throw new Error(error);
            } else if (result.statusCode === 500) {
                var allData = JSON.parse(body);
                return allData;
            } else {
                allData = JSON.parse(body);
                if (allData.data) {
                    return allData.data;
                } else {
                    return allData;
                }
            }
        });
    } catch (err) {
        throw new Error(err)
    }
}

export default {
    API
}