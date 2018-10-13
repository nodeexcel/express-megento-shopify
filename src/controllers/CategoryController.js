import BaseAPIController from './BaseAPIController'
import CategoryProvider from '../providers/CategoryProvider'
import request from '../service/request'
export class CategoryController extends BaseAPIController {

    /* Controller for get all categories*/
    getAllCategories = async (req, res, next) => {
        try {
            let data = [];
            let itemData = {};
            let manage_data = await CategoryProvider.setPathForGetCategories(req.headers, req.url_path, req.method, req.store);
            let getAllCategories = await request.requestToServer(manage_data);
            if (req.isMagento) {
                getAllCategories = getAllCategories;
            } else if (req.isShopify) {
                let allCategories = getAllCategories["shop"]["collections"]["edges"];
                allCategories.forEach((item, key) => {
                    itemData = {
                        "id": item["node"]["id"],
                        "name": item["node"]["title"],
                        "is_active": true,
                        "children_data": []
                    };
                    data.push(itemData);
                })
                getAllCategories = {
                    "id": null,
                    "name": "Default Category",
                    "is_active": true,
                    "children_data": data
                };
            } else {
                throw "only magento and shopify platform supported";
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
            let defaultPrice = "";
            let defaultSKU = "";
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
                let allCategorieProductWithPagination;
                if(req.body.currentPage>1){                    
                    req["body"]["lastCursor"] = categoryProduct["node"]["products"]["edges"][(categoryProduct["node"]["products"]["edges"].length)-1]["cursor"];
                    let manage_data_for_pagination = await CategoryProvider.setDetailsForGetCategoryProductWithPagination(req.body, req.headers, req.url_path, req.store);
                    let categoryProductWithPaginationResponse = await request.requestToServer(manage_data_for_pagination);
                    allCategorieProductWithPagination = categoryProductWithPaginationResponse["node"]["products"]["edges"];
                } else {
                    allCategorieProductWithPagination = categoryProduct["node"]["products"]["edges"];
                }
                allCategorieProductWithPagination.forEach((item, key) => {
                    let allVariants = item["node"]["variants"]["edges"];
                    let variantData = [];
                    allVariants.forEach((item, key) => {
                        if(item["node"]["title"] == "Default Title"){
                            defaultPrice = item["node"]["price"];
                            defaultSKU = item["node"]["sku"];
                        } else {
                            defaultPrice = "";
                        }
                        variantData.push(item["node"]);
                    })
                    itemData = {
                        "id": item["node"]["id"],
                        "sku": defaultSKU ? defaultSKU :(allVariants.length ? allVariants[0]["node"]["sku"] : null),
                        "name": item["node"]["title"],
                        "attribute_set_id": null,
                        "price": defaultPrice ? defaultPrice :(allVariants.length ? allVariants[0]["node"]["price"] : null),
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
                throw "only magento and shopify platform supported";
            }
            this.handleSuccessResponse(res, next, categoryProduct)
        } catch (err) {
            this.handleErrorResponse(res, err)
        }
    }
}

const controller = new CategoryController()
export default controller