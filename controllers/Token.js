const axios = require('axios');

const APP_ENVIRONMENT = 'live'; // Set to 'sandbox' or 'live' as needed

let apiUrl, consumerKey, consumerSecret;

if (APP_ENVIRONMENT === 'sandbox') {
    apiUrl = "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken"; // Sandbox URL
    consumerKey = process.env.CONSUMER_KEY;
    consumerSecret =process.env.CONSUMER_SECRET;
} else if (APP_ENVIRONMENT === 'live') {
    apiUrl = "https://pay.pesapal.com/v3/api/Auth/RequestToken"; // Live URL
    consumerKey = process.env.CONSUMER_KEY;
    consumerSecret =process.env.CONSUMER_SECRET;
} else {
    console.log("Invalid APP_ENVIRONMENT");
    process.exit(1);
}


const data = {
    "consumer_key": consumerKey,
    "consumer_secret": consumerSecret
};

const createToken = async (req, res, next) => {
    await axios
      .post(
        apiUrl, data,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        }
      )
      .then((response) => {
        const responseData = response.data;
        const token = responseData.token;
        console.log("Token received:", token);
      })
      .catch((err) => {
        console.log('TOKEN ERROR',err);
        res.status(400).json(err.message);
      });
  };

  module.exports = { createToken};