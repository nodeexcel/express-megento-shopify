import request from 'request'
import config from '../config'
let requestToServer = async (reqData) => {

    return new Promise(function (resolve, reject) {
        var option = {
            url: reqData.endUrl,
            method: reqData.method,
            headers: {
                "APP_ID": reqData.app_id || config.magentoAppId,
                "Authorization": reqData.authorization,
                'Content-Type': config.contentType,
            },
            // timeout: 10000,
        };
        if(reqData.method == 'POST'){
            option.body = JSON.stringify(reqData.body);
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
    requestToServer
}