const express = require("express");
const router = express.Router();
 
const  auth = require('./../middleware/auth');
const { doctorData } = require("../Controllers/doctorControllerData");
const { createReport, getFeedbackReports } = require("../Controllers/reportControllerHusban");
 
  
router.post('/', auth, createReport);
router.get('/feedback/:feedbackId', getFeedbackReports);


 

  
module.exports = router;
