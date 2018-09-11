let register = async (req) => {
    let body = req.body;
    let data = {customer:{}}
    if(req.api_end_point_server == 'shopify'){
        data['customer']['first_name'] = body.customer.firstname;
        data['customer']['last_name'] = body.customer.lastname;
        data['customer']['email'] = body.customer.email;
        data['passsword'] = body.passsword;
        req.body = data;
        return
    }
};

let login = async (req) => {
    req.endPoint = '/rest/V1/integration/customer/token';
};

let forgotPassword = async (req) => {
    
};

let social_account = async (req) => {
    req.endPoint = '/rest/V1/directory/countries';
};

let delete_account = async (req) => {
    req.endPoint = '/rest/V1/directory/countries';
};

let logout = async (req) => {
    req.endPoint = '/rest/V1/directory/countries';
};

export default {
    login,
    register,
    forgotPassword,
    social_account
};