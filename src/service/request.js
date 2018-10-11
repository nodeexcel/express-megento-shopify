import request from 'request'
import config from '../config'
let requestToServer = async (reqData) => {
    console.log(reqData);
    return new Promise(function (resolve, reject) {
        if(!reqData.storefrontAccessToken){
            reqData.body = JSON.stringify(reqData.body);
        }
        var option = {
            url: reqData.endUrl,
            method: reqData.method,
            headers: {
                "APP_ID": reqData.app_id || config.magentoAppId,
                "Authorization": reqData.authorization,
                'Content-Type': reqData.contentType,
                'X-Shopify-Storefront-Access-Token': reqData.storefrontAccessToken
            },
            body: reqData.body 
            // timeout: 10000,
        };
        // if(reqData.method == 'POST'){
        //     option.body = JSON.stringify(reqData.body);
        // }
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
                    if(allData.errors){
                        if(allData.errors.length){
                            reject(allData.errors[0].message);
                        }
                    } else {
                        resolve(allData.data);
                    }
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