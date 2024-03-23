const axios = require('axios');
const { token, APP_ENVIRONMENT } = require('./acesstoken');

let getIpnListUrl;

if (APP_ENVIRONMENT === 'sandbox') {
    getIpnListUrl = "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/GetIpnList";
} else if (APP_ENVIRONMENT === 'live') {
    getIpnListUrl = "https://pay.pesapal.com/v3/api/URLSetup/GetIpnList";
} else {
    console.log("Invalid APP_ENVIRONMENT");
    process.exit(1);
}

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
};

axios.get(getIpnListUrl, { headers })
    .then(response => {
        console.log("IPN list retrieved successfully:");
        console.log(response.data);
    })
    .catch(error => {
        console.error("Error retrieving IPN list:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
    });
