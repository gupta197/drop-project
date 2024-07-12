const router = require('express').Router(),
student = require('../controller/studentController'),
 auth = require("../middleware/auth");

// Get All Students or get Students Details 
router.get('/',auth, student.getStudents);

//Create new Students with respect to user
router.post('/',auth, student.addNewStudents);


// Update Students Detail
router.put('/',auth, student.updateStudentsDetails);

//Delete Students
router.delete('/',auth, student.deleteStudents);

module.exports = router;