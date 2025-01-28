const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} = require("./emailTemplates.js");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

exports.sendResetPasswordEmail = async (receiverEmail, resetPasswordUrl) => {
  try {
    const info = await transporter.sendMail({
      from: {
        name: "Stock",
        address: process.env.NODE_MAILER_EMAIL,
      },
      to: receiverEmail,
      subject: "Hello ✔",
      text: "Hello world?",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        resetPasswordUrl
      ),
    });
    return true;
  } catch (error) {
    console.log("error while send reset password email : ", error);
    return false;
  }
};
