const express = require("express");
const router = express.Router();
const chatsController = require("../Controllers/chatsController");
const  auth = require('./../middleware/auth');


router.post("/getChats",auth, chatsController.getChats);
router.post("/addMessage",auth, chatsController.addMessage);

module.exports = router;