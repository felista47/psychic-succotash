const express = require("express");
const router= express.Router()
const {createToken}= require("../controllers/Token")


  
router.post("/",createToken)


module.exports = router;