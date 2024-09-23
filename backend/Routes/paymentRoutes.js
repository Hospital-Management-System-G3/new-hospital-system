const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/paymentController");
const auth = require('./../middleware/auth')
router.post("/pay", auth,paymentController.createPaymentIntent);
module.exports = router;