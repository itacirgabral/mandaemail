const nodemailer = require("nodemailer")

const port = process.env.SMTP_PORT
const host = process.env.SMTP_HOST
const user = process.env.MAIL_USERNAME
const pass = process.env.MAIL_PASSWORD
const dest = process.env.MAIL_DESTINATARY

console.log(JSON.stringify({ host, port, user, pass, dest }, null, 2))

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false, // true for 465, false for other ports
  auth: {
    user,
    pass,
  },
  tls: {
    rejectUnauthorized: false
  }
})

transporter.verify(function(error, success) {
  if (error) {
    console.log(error)
  } else {
    console.log("Server is ready to take our messages")

    transporter.sendMail({
      from:  user,
      to: dest,
      subject: "mandaemail",
      text: "Manda e-mail",
      html: "<b>Manda e-mail</b>",
    }, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.dir(info)
      }
    })
  }
})