const commonFunctions = require("../commonFunctions");

module.exports = {
    contactSuppport : async (req, res) => {
        try {
            const { firstName, lastName, message, email, phone } = req.body;
            if (commonFunctions.checkBlank([firstName, lastName, message, email])) {
                return res.status(400).send({
                    success: false,
                    message: "Bad Request",
                });
            }
            let template = {
                subject: `Thank for your Response to ${process.env.APPNAME}`,
                sendTo: email,
                html: `<strong>Hi ${firstName} ${lastName} </strong>, <br /><br />
                  Thanks for Contact to us, Our team will reach you soon.<br /><br />
                  <strong>Thanks</strong> <br />
                  <strong>${process.env.APPNAME} </strong>`,
            };
            return res.status(200).send({
                success: true,
                message: "email Sent to user.",
                template
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: "Something went wrong!...",
            });
        }
    }
}