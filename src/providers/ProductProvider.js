import config from '../config';
let setPathForProducts = (async function(headers, url_path, method, store, params) {
    let manage_data = {};
    if (store == 'magento') {
        manage_data.endUrl = url_path + `/V1/products?searchCriteria[filterGroups][0][filters][0][field]=entity_id&searchCriteria[filterGroups][0][filters][0][condition_type]=eq&searchCriteria[filterGroups][0][filters][0][value]=${params.sku}`;
        manage_data.method = "GET";
        manage_data.app_id = headers.app_id;
        manage_data.authorization = headers.authorization;
        return manage_data;
    } else if (store == 'shopify') {
        manage_data.body = `{
            node(id:"${params.sku}") {
                id
                ... on Product {
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


export default {
    setPathForProducts,
};

/* ${params.SKU_or_id}*/