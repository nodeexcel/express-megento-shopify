import request from 'request'
import config from '../config'
let API = async (req) => {

    return new Promise(function (resolve, reject) {
        console.log("******************************************************************************")
        console.log(req.endUrl)
        console.log("******************************************************************************")
        request({
            url: req.endUrl,
            method: req.method,
            headers: {
                APP_ID: req.headers.app_id || 'com.xmage',
                "Authorization": req.headers.authorization,
                'Content-Type': 'application/json',
            },
            // timeout: 10000,
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
                    if(allData.errors){
                        reject(allData.errors);
                    } else if(allData.message) {
                        reject(allData.message);
                    } else {
                        resolve(allData);
                    }
                }
            }
        });
    });
}

export default {
    API
}