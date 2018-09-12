import request from 'request'
import config from '../config'
let API = async (req) => {

    return new Promise(function (resolve, reject) {
        console.log(req.endUrl)
        var option = {
            url: req.endUrl,
            method: req.method,
            headers: {
                "APP_ID": req.headers.app_id || 'com.xmage',
                "Authorization": req.headers.authorization,
                'Content-Type': 'application/json',
            },
            // timeout: 10000,
        };
        if(req.method == 'post'){
            option.body = JSON.stringify(req.body);
        }
        request(option, function (error, result, body) {
            if (error) {
                reject(error);
            } else if (result.statusCode === 500) {
                var allData = JSON.parse(body);
                allData.statusCode = 500;
                reject(allData);
            } else {
                // console.log(body)
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