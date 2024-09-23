const express = require("express");
const {
  getAllFeedback,
  replyToFeedback,
  deleteFeedback,
} = require("../Controllers/feedbackController");

const router = express.Router();

router.get("/feedback", getAllFeedback);
router.post("/feedback/reply", replyToFeedback);
router.delete("/feedback/:feedback_id", deleteFeedback);

module.exports = router;
