module.exports = {
    port: 8000,
    bodyLimit: '100kb',
    corsHeaders: ['Link'],
    storefrontAccessToken: '5b63592a6e602041ce38fdac4f1d3473',
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
        // url: "https://ce9c132322821fc92bcc7bcdbcb38751:f05828608e4ac2db3d456a6e13d8491e@manishiitg.myshopify.com/admin",
        url: "https://manishiitg.myshopify.com/api/graphql",
        store: "shopify"
    }
}