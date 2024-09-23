const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const settingsController = require("../Controllers/settingsController");

router.get("/get", settingsController.getSettings);
router.put(
  "/edit",
  upload.single("logo_image"),
  settingsController.updateSettings
);

module.exports = router;
