const Student = require('../model/student'),
commonFunctions = require("../commonFunctions"),
mongoose = require('mongoose');
module.exports = {
    // Get User Customers and also we get customer detail in same api
    getStudents : async (req, res)=>{
        try {

            let getDetailObj = {}
            // This condition will help to get the user detail in same api
            if(req.query.search && !commonFunctions.checkBlank([req.query.search])){
               const regexQuery = new RegExp(req.query.search, 'i'); // 'i' makes the regex case-insensitive;
               getDetailObj = {
                $or: [
                    { firstName: regexQuery },
                    { lastName: regexQuery },
                    { email: regexQuery },
                    { phone: regexQuery },
                    { description: regexQuery }
                ]
               }
            }

            const users = await Student.find(getDetailObj);
            if (!users || users.length == 0) {
                return res.status(404).send({ success: false, message: "User not found" });
            }
            return res.status(200).send({ success: true, message: "User found Successfully", records: users });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    // Create new with respect for user
    addNewStudents : async (req, res)=>{
        try {
            const {email} = req.body;
            // these field are used to create the customer name, contactNumber , email, address
            let checkValidate = commonFunctions.validatioReqBody(req, "user");
            if (checkValidate !== true) {
                return res.status(400).send({
                    success: false,
                    message: "Parameter missing.. !!",
                });
            }

            let checkStudent = await Student.find({email})
            if(checkStudent && checkStudent.length){
                return res.status(409).send({
                    success: false,
                    message: "User Already exists!!",
                });
            }
            delete req.body.studentId;
            delete req.body.userId
            req.body.studentId = new mongoose.Types.ObjectId().toString();
            const studentRes = await Student.create(req.body);

            return res.status(201).send({
                success: true,
                message: "New User added Successfully!!",
                records: studentRes 
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    // Update customer Detail using this api
    updateStudentsDetails : async (req, res)=>{
        try {
            // these field are used to create the Student id, name, contactNumber , email, address
            const { id } = req.body;
            // Check if id is not null or empty
            if(commonFunctions.checkBlank([id])){
                return res.status(400).send({
                    success: false,
                    message: "Parameter missing.. !!",
                });
            }
            // get if user have Student with respect of id
            const checkstudent = await Student.find({studentId : id})
            // Check if student found in database
            if(checkstudent && checkstudent.length == 0){
                return res.status(404).send({
                    success: false,
                    message: "User not found",
                });
            }
            // Update student detail 
            delete req.body.studentId;
            delete req.body._id;
            await Student.updateOne({studentId : id}, req.body)
            return res.status(200).send({
                success: true,
                message: "User Detail Updated Successfully",
                records: []
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    // Delete the student detail
    deleteStudents : async (req, res)=> {
        try {
            // these field are used to create the students id, name, contactNumber , email, address
            const { id } = req.body;
            // Check if id is not null or empty
            if(commonFunctions.checkBlank([id])){
                return res.status(400).send({
                    success: false,
                    message: "Parameter missing.. !!",
                });
            }
            // get if user have students with respect of id
            const checkStudent = await Student.find({studentId : id})
            // Check if students found in database
            if(checkStudent && checkStudent.length == 0){
                return res.status(400).send({
                    success: false,
                    message: "User not found",
                });
            }
            // Delete students 
            await Student.deleteOne({studentId : id })
            return res.status(200).send({
                success: true,
                message: "User deleted Successfully",
                records: []
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    verifyCertificate : async (req, res)=>{
        try {
            if (commonFunctions.checkBlank([req.query.certificate])) {
                return res.status(400).send({
                    success: false,
                    message: "Bad Request",
                });
            }
            const users = await Student.findOne({certificateId : req.query.certificate});
            if (!users || users.length == 0) {
                return res.status(404).send({ success: false, message: "User Certificate not found" });
            }
            delete users._id;
            delete users.studentId;
            delete users.isEnrolled;

            return res.status(200).send({ success: true, message: "User Certificate found Successfully", records: users });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
}