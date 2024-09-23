const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/contactController");

// Route to get all contacts
router.get("/contacts", contactController.getContacts);
router.post("/contacts/:id/reply", contactController.replyToFeedback);

router.post("/submit", contactController.submitContact);

module.exports = router;
