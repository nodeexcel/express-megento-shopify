import request from 'request'
import config from '../config'
let API = async (req) => {

    return new Promise(function (resolve, reject) {
        request({
            url: req.endUrl,
            method: req.method,
            headers: {
                APP_ID: req.headers.app_id || 'com.xmage',
                "Authorization": req.headers.authorization,
                'Content-Type': 'application/json',
            },
            timeout: 10000,
            body: JSON.stringify(req.body)
        }, function (error, result, body) {
            if (error) {
                reject(error);
            } else if (result.statusCode === 500) {
                var allData = JSON.parse(body);
                allData.statusCode = 500;
                reject(allData);
            } else {
                allData = JSON.parse(body);
                if (allData.data) {
                    resolve(allData.data);
                } else {
                    resolve(allData);
                }
            }
        });
    });
}

export default {
    API
}


/*

            console.log("************************************************************************");
            console.log("http://plivo1.demo.xmagestore.com/magento2/magento223/index.php"+req.endPoint);
            console.log("************************************************************************");
            // protocol: 'http:',
            // url: `${config.url}/Magento-CE-2.1.9_sample_data-2017-09-13-03-48-19/index.php/rest`+req.originalUrl,
            // url:"https://www.google.com",
*/