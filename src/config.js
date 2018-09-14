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
    magentoAppId: "com.xmage",
    contentType: "application/json",
    getMethod: "GET",
    postMethod: "POST",
    serverUrl: [
        {
            app_id: "com.excellence.magento",
            url: "http://192.168.1.129/magento2/index.php/rest",
            store: "magento"
        },
        {
            app_id: "com.excellence.shopify",
            url: "https://ce9c132322821fc92bcc7bcdbcb38751:f05828608e4ac2db3d456a6e13d8491e@manishiitg.myshopify.com/admin",
            store: "shopify"
        }]
}