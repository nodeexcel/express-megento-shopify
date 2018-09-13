import config from '../config'

export class AuthController {
    // middleware for logged in users
    appData(req, res, next) {
        if(req.headers.app_id == 'com.excellence.magento'){
            req.url_path = config.magentoUrl;
            req.endUrl = null;
            req.isMagento = true;
            req.isShopify = false;
            next()
        }else if(req.headers.app_id == 'com.excellence.shopify'){
            req.url_path = config.shopifyUrl;
            req.endUrl = null;
            req.isMagento = false;
            req.isShopify = true;
            next()
        }else{
            res.status(400).json({message: "Invalid App Id"});
        }
    }
}

const controller = new AuthController()
export default controller