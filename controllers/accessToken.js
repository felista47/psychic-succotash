const axios = require('axios');

const createTokenAndRegisterIPN = async () => {
    const data = JSON.stringify({
        "consumer_key": "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW",
        "consumer_secret": "osGQ364R49cXKeOYSpaOnT++rHs="
    });

    const ipnRegistrationUrl = "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN";

    try {
        // Create token request
        const tokenResponse = await axios.post("https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken", data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const tokenData = tokenResponse.data;
        const token = tokenData.token;

        // Register IPN request
        const ipnData = JSON.stringify({
            "url": "https://476d-41-89-227-171.ngrok-free.app/ipn",
            "ipn_notification_type": "GET"
        });

        const ipnHeaders = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const ipnResponse = await axios.post(ipnRegistrationUrl, ipnData, { headers: ipnHeaders });

        const ipnResponseData = ipnResponse.data;
        const ipnId = ipnResponseData.ipn_id;
        const ipnUrl = ipnResponseData.url;

        console.log("IPN registration successful");
        console.log("IPN ID:", ipnId);
        console.log("IPN URL:", ipnUrl);

        return { token, ipnId, ipnUrl };
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
};

const submitOrder = async () => {
    try {
        const { token, ipnId } = await createTokenAndRegisterIPN();
        const merchantReference = Math.floor(Math.random() * 1000000000000000000);
        const phone = "0745825378";
        const amount = 2.00;
        const callbackUrl = "https://12eb-41-81-142-80.ngrok-free.app/pesapal/response-page.php";
        const branch = "Manoti";
        const firstName = "Felista";
        const middleName = "Manoti";
        const lastName = "Sawe";
        const emailAddress = "manotifelista9@gmail.com";     

        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const data = {
            "id": `${merchantReference}`,
            "currency": "KES",
            "amount": amount,
            "description": "Payment description goes here",
            "callback_url": `${callbackUrl}`,
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

        const response = await axios.post("https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest", data, { headers });
        console.log("Order submission successful:");
        console.log(response.data);
    } catch (error) {
        console.error("Error submitting order:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
    }
};

submitOrder();
module.exports = createTokenAndRegisterIPN;
