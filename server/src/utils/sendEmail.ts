import nodemailer from "nodemailer";
// Test Email Info
// user: 'hdjmhsqno5lcmfl6@ethereal.email',
// pass: 'jEFGma1qdmfJnkQTNu',

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, text: string, subject: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("test account", testAccount);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "hdjmhsqno5lcmfl6@ethereal.email", // generated ethereal user
      pass: "jEFGma1qdmfJnkQTNu", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
