import config from '../config'

export class AuthController {
    // middleware for logged in users
    appData(req, res, next) {
        let data = [];
        req.isMagento = false;
        req.isShopify = false;
        if (req.headers.app_id) {
            config.serverUrl.forEach((value) => {
                if (value.app_id == req.headers.app_id) {
                    data.push(value);
                }
            })

            if (data.length) {
                req.endUrl = null;
                req.url_path = data[0].url;
                req.store = data[0].store;
                if(data[0].store == 'magento'){
                    req.isMagento = true;
                }
                if(data[0].store == 'shopify'){
                    req.isShopify = true;
                }
                next()
            
            } else {
                res.status(400).json({ message: "data not found for app_id" });
            }

        } else {
            res.status(400).json({ message: "provide app_id" });
        }
    }
}

const controller = new AuthController()
export default controller