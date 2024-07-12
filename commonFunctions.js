const request = require("request"),
 moment = require('moment'),
 Joi = require('joi');

exports.checkBlank = function (arr) {
  if (!Array.isArray(arr)) {
    return 1;
  }
  var arrlength = arr.length;
  for (var i = 0; i < arrlength; i++) {
    if (arr[i] === undefined || arr[i] == null) {
      arr[i] = "";
    } else {
      arr[i] = arr[i];
    }
    arr[i] = arr[i].toString().trim();
    if (arr[i] === "" || arr[i] === "" || arr[i] === undefined) {
      return 1;
    }
  }
  return 0;
};

exports.generateRandomStringAndNumbers = function (len) {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

exports.generateOtp = function (len) {
  var text = "";
  var possible = "0123456789";
  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

exports.addDays = function (days) {
  var newDate = new Date();
  newDate.setTime(newDate.getTime() + 86400000 * days); // add a date
  newDate.setHours(23, 59, 59, 999);
  return new Date(newDate);
};

exports.handleValidation = function (err) {
  const messages = [];
  for (let field in err.errors) {
    return err.errors[field].message;
  }
  return messages;
};

exports.sendHttpRequest = function (opts) {
  var options = opts.options;
  return new Promise((resolve, reject) => {
    console.log("HTTP_REQUEST:", options);
    request(options, (error, response, body) => {
      if (error) {
        console.log("Error from external server", error);
        return reject(error);
      }
      if (response == undefined) {
        error = new Error("No response from external server");
        return reject(error);
      }
      if (response.statusCode < "200" || response.statusCode > "299") {
        console.log("http-----", body);
        error = new Error("Couldn't request with external server ");
        error.code = response.statusCode;
        //console.log( 'Error from external server', error );
        //console.log('Response----->', body);
        return reject(error);
      }
      console.log("Response from external server", response, body);
      return resolve(body);
    });
  });
};
exports.get_time_diff = function (startdate, endDate, returnType) {
  endDate = moment(endDate);//now
  startdate = moment(startdate);
    // Return type should be 'minutes','days','weeks','hours'
  return startdate.diff(endDate, returnType)
};

module.exports.validatioReqBody = (req, data) => {
  let schema;
  switch (data) {
      case "login":
          schema = Joi.object({
              email: Joi.string().email().required(),
              password: Joi.string().required()
          }).unknown();
          break;
      case "register":
          schema = Joi.object({
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string(),
            password: Joi.string().required()
          }).unknown();

          break;
      case "user":
            schema = Joi.object({
              email: Joi.string().email().required(),
              firstName: Joi.string().required(),
              lastName: Joi.string(),
              phone: Joi.string().required()
            }).unknown();
  
            break;
      case "changePassword":
          schema = Joi.object({
              currentPassword: Joi.string().required(),
              newPassword: Joi.string().required()
          }).unknown();
          break;
      case "resetPassword":
        schema = Joi.object({
          id: Joi.string().required(),
          token: Joi.string().required(),
          password: Joi.string().required()
        }).unknown();
        break;
      case "verifyOTP":
          schema = Joi.object({
            userId: Joi.string().required(),
            otp: Joi.string().required()
          }).unknown();
          break;
      case "email":
        schema = Joi.object({
          email: Joi.string().email().required(),
        }).unknown();
      break;
      case "userId":
          schema = Joi.object({
            userId: Joi.string().required(),
          }).unknown();
        break;
        case "id":
          schema = Joi.object({
            userId: Joi.string().required(),
          }).unknown();
        break;
        
      case "updatePost":
          schema = Joi.object({
              id: Joi.string().required(),
              title: Joi.string().required(),
              content: Joi.string().required()
          }).unknown();
          break;

      default:
          break;
  }
  const { error } = schema.validate(req.body);
  // Validate user input
  if (error) {
      return error.details[0].message;
  }
  return true;
}