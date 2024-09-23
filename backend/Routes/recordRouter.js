const express = require("express");
const router = express.Router();
const recordController = require("../Controllers/recordController");
const  auth = require('./../middleware/auth');


router.get("/getRecord",auth, recordController.getRecord);

module.exports = router;