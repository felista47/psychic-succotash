const express = require("express");

const app = express();
const port = 3000; // Port to listen on
app.use(express.json());



const paymentRoute= require("./routes/paymentRoute")
app.use("/payment", paymentRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });