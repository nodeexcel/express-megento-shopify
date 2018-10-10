import BaseAPIController from './BaseAPIController'
import CategoryProvider from '../providers/CategoryProvider'
import request from '../service/request'
export class CategoryController extends BaseAPIController {

    /* Controller for get all categories*/
    getAllCategories = async (req, res, next) => {
        try {
            let data = [];
            let manage_data = await CategoryProvider.setPathForGetCategories(req.headers, req.url_path, req.method, req.store);
            let getAllCategories = await request.requestToServer(manage_data);
            if (req.isMagento) {
                getAllCategories = getAllCategories;
            } else if (req.isShopify) {
                let allCategories = getAllCategories["shop"]["collections"]["edges"];
                allCategories.forEach((item, key) => {
                    item["node"]["name"] = item["node"]["title"];
                    data.push(item["node"]);
                })
                getAllCategories = {
                    "name": "Default Category",
                    "is_active": true,
                    "children_data": data
                };
            } else {
                // coming soon
            }
            this.handleSuccessResponse(res, next, getAllCategories)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }

    /* Controller for get product for a category*/
    categoryProduct = async (req, res, next) => {
        try {
            let data = [];
            let itemData = {};
            let manage_data = await CategoryProvider.setPathForGetCategoryProduct(req.body, req.headers, req.url_path, req.store);
            let categoryProduct = await request.requestToServer(manage_data);
            if (req.isMagento) {
                categoryProduct['items'].forEach((value, key) => {
                    var imageLink = value.custom_attributes.find((details) => {
                        if (details.attribute_code == "image") {
                            return details.value;
                        }
                    })
                    categoryProduct.items[key].imageLink = imageLink.value;
                })
            } else if (req.isShopify) {
                let allCategorieProduct = categoryProduct["node"]["products"]["edges"];
                allCategorieProduct.forEach((item, key) => {
                    let allVariants = item["node"]["variants"]["edges"];
                    let variantData = [];
                    allVariants.forEach((item, key) => {
                        variantData.push(item["node"]);
                    })
                    itemData = {
                        "id": item["node"]["id"],
                        "sku": "",
                        "name": item["node"]["title"],
                        "attribute_set_id": null,
                        "price": null,
                        "status": item["node"]["availableForSale"],
                        "visibility": null,
                        "type_id": "",
                        "created_at": item["node"]["createdAt"],
                        "updated_at": item["node"]["updatedAt"],
                        "product_links": [item["node"]["onlineStoreUrl"]],
                        "tier_prices": [],
                        "imageLink": item["node"]["images"]["edges"][0]["node"]["originalSrc"],
                        "description": item["node"]["description"],
                        "descriptionHtml": item["node"]["descriptionHtml"],
                        "variants": variantData
                    };
                    data.push(itemData);
                })
                categoryProduct = {
                    "items": data
                }
            } else {
                // coming soon
            }
            this.handleSuccessResponse(res, next, categoryProduct)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }
}

const controller = new CategoryController()
export default controller