const express = require("express");
const router = express.Router();
const infoAboutController = require("../Controllers/infoAboutController");

router.get("/info-about", infoAboutController.getInfoAbout);

router.put("/edit/info-about", infoAboutController.updateInfoAbout);

module.exports = router;
