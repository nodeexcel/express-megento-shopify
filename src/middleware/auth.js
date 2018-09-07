import jwt from 'jsonwebtoken'
import request from'request'

export class AuthController {
    // middleware for logged in users
    requiresLogin(req, res, next) {

    }

    api(req, res, next){
    	req.URL = 'http://192.168.1.129/Magento-CE-2.1.9_sample_data-2017-09-13-03-48-19/index.php/rest';
    	let url = req.originalUrl;
    	let method = req.method
    	let body = req.body

    	request({
        protocol: 'http:',
        url: req.URL + url, //URL to hit
        method: method,
        headers: {APP_ID: req.headers.app_id, "Authorization": req.headers.authorization, 'Content-Type': 'application/json',},
        timeout: 10000,
        body: JSON.stringify(body)
    }, function (error, result, body) {
        if (error) {
            res.status(500);
        } else if (result.statusCode === 500) {
            var allData = JSON.parse(body);
            res.status(500).send(allData.data);
        } else {
            allData = JSON.parse(body);
            if (allData.data) {
            res.json({status:1, body:allData.data});
            } else {
                res.json({status:1, body:allData});
            }
        }
    });
    }
}

const controller = new AuthController()
export default controller