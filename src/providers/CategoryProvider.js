import config from '../config';
let setPathForGetCategories = (async function (headers, url_path, method, store) {
    let manage_data = {};
    if (store == 'magento') {
        manage_data.endUrl = url_path + "/V1/categories";
        manage_data.method = method;
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        return manage_data;
    } else if (store == 'shopify') {
        manage_data.body = `{
            shop {
              collections(first: 6) {
                edges {
                  node {
                    id
                    title
                    handle
                    description
                    updatedAt
                    descriptionHtml
                  }
                }
                pageInfo {
                  hasNextPage
                }
              }
            }
          }`;
        manage_data.endUrl = url_path;
        manage_data.method = "POST";
        manage_data.contentType = "application/graphql";
        manage_data.storefrontAccessToken = headers.storefrontAccessToken;
        return manage_data;
    } else {
        throw "only magento and shopify platform supported";
    }
});
let setPathForGetCategoryProduct = (async function (body, headers, url_path, store) {
    let manage_data = {};
    if (store == 'magento') {
        manage_data.endUrl = url_path + "/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=" + body.category_id + "&searchCriteria[sortOrders][0][field]=" + body.sortBy + "&searchCriteria[sortOrders][0][direction]=" + body.sortOrder + "&searchCriteria[pageSize]=" + body.pageSize + "&searchCriteria[currentPage]=" + body.currentPage;
        manage_data.method = "GET";
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        return manage_data;
    } else if (store == 'shopify') {
        let sort = false;
        if(body.sortOrder.toUpperCase() == 'DESC'){
            sort = true;
        }
        manage_data.body = `{
            node(id: "${body.category_id}") {
              id
              ... on Collection {
                    products(first: ${body.pageSize}, sortKey: ${body.sortBy.toUpperCase()}, reverse: ${sort}) {
                            edges {
                              node {
                                id
                                title
                                handle
                                description
                                availableForSale
                                createdAt
                                descriptionHtml
                                onlineStoreUrl
                                productType
                                publishedAt
                                tags
                                updatedAt
                                images(first: 100) {
                                        edges {
                                          node {
                                            id
                                            originalSrc
                                            transformedSrc
                                            altText
                                          }
                                        }
                                    }
                                variants(first: 100) {
                                    edges {
                                      node {
                                        id
                                        sku
                                        title
                                        price
                                        selectedOptions {
                                          name
                                          value
                                        }
                                      }
                                    }
                                  }
                              }
                              cursor
                            }
                            pageInfo {
                              hasNextPage
                            }
                        }
                    }
                }
            }
          `;
        manage_data.endUrl = url_path;
        manage_data.method = "POST";
        manage_data.contentType = "application/graphql";
        manage_data.storefrontAccessToken = headers.storefrontAccessToken;
        return manage_data;
    } else {
        throw "only magento and shopify platform supported";
    }
});

export default {
    setPathForGetCategories,
    setPathForGetCategoryProduct
};