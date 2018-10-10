module.exports = {
    port: 8000,
    bodyLimit: '100kb',
    corsHeaders: ['Link'],
    db: {
        host: 'localhost',
        name: 'test',
        password: 'java@123',
        username: 'root'
    },
    "com.excellence.magento":{
        url: "http://192.168.1.129/magento2/index.php/rest",
        store: "magento"
    },
    "com.excellence.shopify":{
        url: "https://manishiitg.myshopify.com/api/graphql",
        store: "shopify",
        storefrontAccessToken: '5b63592a6e602041ce38fdac4f1d3473',
    }
}