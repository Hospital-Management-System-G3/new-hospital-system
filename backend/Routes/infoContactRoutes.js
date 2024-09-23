const express = require("express");
const router = express.Router();
const {
  getInfoContact,
  updateInfoContact,
} = require("../Controllers/infoContactController");

router.get("/info/contact", getInfoContact);
router.put("/edit/info/contact", updateInfoContact);

module.exports = router;
