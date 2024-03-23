const express = require('express');
const router = express.Router();
const createTokenAndRegisterIPN = require('../controllers/accessToken');

router.post('/', async (req, res) => {
    try {
        const { token, ipnId, ipnUrl } = await createTokenAndRegisterIPN();
        res.status(200).json({ token, ipnId, ipnUrl });
    } catch (error) {
        console.error("Error registering IPN:", error.message);
        res.status(500).json({ error: error.message });
    }
});
app.get('/pesapal/ipn', (req, res) => {
    res.send('<h1>Hello, this is the IPN page!</h1>'); // Send a simple HTML response
});
module.exports = router;
