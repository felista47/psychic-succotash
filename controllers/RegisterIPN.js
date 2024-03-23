const axios = require('axios');
const { token, APP_ENVIRONMENT } = require('./acesstoken');

let ipnRegistrationUrl;

if (APP_ENVIRONMENT === 'sandbox') {
    ipnRegistrationUrl = "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN";
} else if (APP_ENVIRONMENT === 'live') {
    ipnRegistrationUrl = "https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN";
} else {
    console.log("Invalid APP_ENVIRONMENT");
    process.exit(1);
}

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
};

const data = {
    "url": "https://b0b0-41-89-227-171.ngrok-free.app/ipn",
    "ipn_notification_type": "POST"
};

axios.post(ipnRegistrationUrl, data, { headers })
    .then(response => {
        const responseData = response.data;
        const ipnId = responseData.ipn_id;
        const ipnUrl = responseData.url;
        console.log("IPN registration successful");
        console.log("IPN ID:", ipnId);
        console.log("IPN URL:", ipnUrl);
    })
    .catch(error => {
        console.error("Error registering IPN:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
    });
