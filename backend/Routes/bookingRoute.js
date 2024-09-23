const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/bookingController");
const auth = require("./../middleware/auth");




router.get("/booking/:id", auth, bookingController.GetBooking);
module.exports = router;
