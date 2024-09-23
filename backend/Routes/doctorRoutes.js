const express = require("express");
const router = express.Router();
 
const  auth = require('./../middleware/auth');
const { doctorData } = require("../Controllers/doctorControllerData");
const { allRecords } = require("../Controllers/recordsController");
const { getPatientRecordbyrecordId } = require("../Controllers/recordControllerusingrecordID");
const { updatePatientRecord } = require("../Controllers/updateRecord");
const { addPatientRecord } = require("../Controllers/addnewpatient");
const { doctorAvailabilities } = require("../Controllers/doctorAvailabilities");
const { deleteTime } = require("../Controllers/softDeleteTime");
const { addDoctorAvailability } = require("../Controllers/addNewTime");
const { fetchDoctorBillingDetails } = require("../Controllers/fetchDoctorBillingDetails");
const { completeAppointment } = require("../Controllers/updatestatus");
///
const { getDoctorAvailabilities, bookAvailability } = require('../Controllers/doctorControllerHusabn');



 router.get("/doctorData", auth ,doctorData );
router.get("/records",  allRecords );
router.get("/records/:recordid",  getPatientRecordbyrecordId );
router.put('/updaterecord/:record_id', updatePatientRecord);
router.post('/addrecord', addPatientRecord);
router.get('/doctorAvailabilities', auth , doctorAvailabilities);
router.post('/deleteTime/:availability_id', deleteTime );
router.post('/addAvailability/',auth, addDoctorAvailability );completeAppointment
router.get('/fetchDatabooked', auth, fetchDoctorBillingDetails);
router.post('/completeAppointment/:billingId', completeAppointment);
///
router.get('/:doctorId/availabilities', getDoctorAvailabilities);
router.post('/book', bookAvailability);


 


router.post('/logout', (req, res) => {
    res.clearCookie('token'); 
    res.status(200).json({ message: 'Logged out successfully' });
  });

  
module.exports = router;



