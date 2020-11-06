const nodemailer = require('nodemailer');

const sendMail = async (opts) => {
  const transport = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    host: `smtp.mailtrap.io`,
    port: 2525,
    auth: {
      user: `dd1f9267eee8d5`,
      pass: `55c76f4f1bd672`,
    },
  });

  const info = {
    from: `Test <noreply@test@nrep.com>`,
    to: opts.email,
    subject: opts.subject,
    text: opts.message,
  };

  const result = await transport.sendMail(info);

  console.log(result.messageId);
};

module.exports = sendMail;
