let register = async (req) => {
    let body = req.body;
    let data = {customer:{}}
    if(req.api_end_point_server == 'shopify'){
        data['customer']['first_name'] = body.customer.firstname;
        data['customer']['last_name'] = body.customer.lastname;
        data['customer']['email'] = body.customer.email;
        data['passsword'] = body.passsword;
        req.body = data;
        req.endUrl = req.url_path + "/customers.json";
        return
    } else {
        req.endUrl = req.url_path + "/V1/customers";
    }
};

let login = async (req) => {
    if(req.api_end_point_server == 'shopify'){
        req.endUrl = req.url_path + "";
        return
    } else {
        req.endUrl = req.url_path + "/V1/integration/customer/token";
    }
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