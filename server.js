const express = require("express");

const app = express();
const port = 3000; // Port to listen on
app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });