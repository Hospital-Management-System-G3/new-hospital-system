const { createFeedback, getDoctorFeedbacks } = require ('../Controllers/feedbackControllerHusban');

const express = require('express');
const router = express.Router();
 const auth = require('../middleware/auth');

router.post('/', auth, createFeedback);
router.get('/doctor/:doctorId', getDoctorFeedbacks);

module.exports = router;
