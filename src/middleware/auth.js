import config from '../config'

export class AuthController {
    // middleware for logged in users
    appData(req, res, next) {
        var data  = config[req.headers.app_id];
        req.isMagento = false;
        req.isShopify = false;
        if (req.headers.app_id) {
            if (data) {
                req.endUrl = null;
                req.url_path = data.url;
                req.store = data.store;
                if(data.store == 'magento'){
                    req.isMagento = true;
                }
                if(data.store == 'shopify'){
                    req.isShopify = true;
                }
                next()
            } else {
                res.status(400).json({ message: "URLs/store not found for app_id" });
            }
        } else {
            res.status(400).json({ message: "provide app_id" });
        }
    }
}

const controller = new AuthController()
export default controller