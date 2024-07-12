const express = require('express'),
 router = express.Router(),
  auth = require('../controller/authContoller'),
  index = require('../controller/indexController'),
  student = require('./studentRoute'),
  studentController = require('../controller/studentController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Register
router.post("/register", auth.register);

// Login and setup 2 factor authication
router.post("/login",auth.login);

// Verify Email
router.get("/verifyEmail",auth.verifyEmail);


// Forget Password
router.post("/forgetPassword",auth.forgetPassword);

// Reset Passwords
router.post("/resetPassword/:id/:token",auth.resetPassword);

// OTP verification
router.post("/verifyOTP",auth.verifyOTP);

//otp share
router.post("/resendOtp",auth.resendOtp);
router.post("/verifyCertificate",auth.resendOtp);

//Contact Support API
router.post("/contact-support",index.contactSuppport);

router.get("/verifyCertificate",studentController.verifyCertificate);

// Handle user Business Details
router.use("/user", student);


module.exports = router;
