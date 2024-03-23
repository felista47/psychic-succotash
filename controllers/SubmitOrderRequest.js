const axios = require('axios');
const { token, APP_ENVIRONMENT } = require('./acesstoken');

const merchantReference = Math.floor(Math.random() * 1000000000000000000);
const phone = "0745825378";
const amount = 2.00;
const callbackUrl = "https://12eb-41-81-142-80.ngrok-free.app/pesapal/response-page.php";
const branch = "Manoti";
const firstName = "Felista";
const middleName = "Manoti";
const lastName = "Sawe";
const emailAddress = "manotifelista9@gmail.com";

let submitOrderUrl;

if (APP_ENVIRONMENT === 'sandbox') {
    submitOrderUrl = "https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest";
} else if (APP_ENVIRONMENT === 'live') {
    submitOrderUrl = "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest";
} else {
    console.log("Invalid APP_ENVIRONMENT");
    process.exit(1);
}

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
};

// Request payload
const data = {
    "id": `${merchantReference}`,
    "currency": "KES",
    "amount": amount,
    "description": "Payment description goes here",
    "callback_url": `${callbackUrl}`,
    // Assuming `ipn_id` is obtained from previous IPN registration
    "notification_id": `${ipnId}`, 
    "branch": `${branch}`,
    "billing_address": {
        "email_address": `${emailAddress}`,
        "phone_number": `${phone}`,
        "country_code": "KE",
        "first_name": `${firstName}`,
        "middle_name": `${middleName}`,
        "last_name": `${lastName}`,
        "line_1": "Pesapal Limited",
        "line_2": "",
        "city": "",
        "state": "",
        "postal_code": "",
        "zip_code": ""
    }
};

axios.post(submitOrderUrl, data, { headers })
    .then(response => {
        console.log("Order submission successful:");
        console.log(response.data);
    })
    .catch(error => {
        console.error("Error submitting order:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
    });
