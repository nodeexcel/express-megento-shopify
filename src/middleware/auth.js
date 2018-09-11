import jwt from 'jsonwebtoken'
import request from 'request'
import config from '../config'

export class AuthController {
    // middleware for logged in users
    appData(req, res, next) {
        req.appData.findOne({app_id: req.headers.app_id}).then((response)=>{
            if(response && response._id){
                console.log(response.get('url'))
                req.url_path = response.get('url');
                next()
            }else{
                res.status(400).json({message: "Invalid App Id"});
            }
        })
    }

    api(req, res, next){
    	req.URL = `${req.url_path}/magento2/index.php/rest`;
        console.log(req.URL)
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