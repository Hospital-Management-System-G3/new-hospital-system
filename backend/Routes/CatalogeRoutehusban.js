const express = require('express');
const { getDoctorsAndNurses } = require('../Controllers/CatalogUserControllerHusban');
const router = express.Router();
 
// Define the route to fetch doctor and nurse data
router.get('/doctors-nurses', getDoctorsAndNurses);

module.exports = router;



