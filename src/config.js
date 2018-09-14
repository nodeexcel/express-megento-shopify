module.exports = {
    port: 7000,
    bodyLimit: '100kb',
    corsHeaders: ['Link'],
    db: {
        host: 'localhost',
        name: 'test',
        password: 'java@123',
        username: 'root'
    },
    magentoUrl: "http://192.168.1.129/magento2/index.php/rest",
    shopifyUrl: "https://ce9c132322821fc92bcc7bcdbcb38751:f05828608e4ac2db3d456a6e13d8491e@manishiitg.myshopify.com/admin",
    magentoAppId: "com.xmage",
    contentType: "application/json",
    getMethod: "GET",
    postMethod: "POST"
}