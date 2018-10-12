import BaseAPIController from './BaseAPIController'
import ProductProvider from '../providers/ProductProvider';
import request from '../service/request'

export class ProductController extends BaseAPIController {
    /* Controller for get product  */
    getOneProduct = async (req, res, next) => {
        try {
            let manage_data = await ProductProvider.setPathForProducts(req.headers, req.url_path, req.method, req.store, req.params);
            let productData = await request.requestToServer(manage_data);
            let product = {}
            if (req.isMagento) {
                product = productData
            } else if (req.isShopify) {
                let defaultPrice;
                productData["node"]["variants"]['edges'].forEach((val, key) => {
                    if (val["node"]["title"] == "Default Title") {
                        defaultPrice = val["node"]["price"];
                    } else {
                        defaultPrice = null;
                    }
                })
                product = {
                    "id": productData["node"]["id"],
                    "sku": "",
                    "name": productData["node"]["title"],
                    "attribute_set_id": null,
                    "price": defaultPrice ? defaultPrice : productData["node"]["variants"]["edges"][0]["node"]["price"],
                    "status": productData["node"]["availableForSale"],
                    "visibility": null,
                    "type_id": "",
                    "created_at": productData["node"]["createdAt"],
                    "updated_at": productData["node"]["updatedAt"],
                    "product_links": [productData["node"]["onlineStoreUrl"]],
                    "tier_prices": [],
                    "imageLink": productData["node"]["images"]["edges"][0]["node"]["originalSrc"],
                    "description": productData["node"]["description"],
                    "descriptionHtml": productData["node"]["descriptionHtml"],
                    "variants": productData["node"]["variants"]
                };
            }
            this.handleSuccessResponse(res, next, product)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

}

const controller = new ProductController()
export default controller