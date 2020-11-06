const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const sendMail = async (opts, data) => {
  const transport = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    host: `smtp.mailtrap.io`,
    port: 2525,
    auth: {
      user: `dd1f9267eee8d5`,
      pass: `55c76f4f1bd672`,
    },
  });

  transport.use(
    'compile',
    hbs({
      viewEngine: 'express-handlebars',
      viewPath: './views/',
    })
  );

  const info = {
    from: `Test <noreply@test@nrep.com>`,
    to: opts.email,
    subject: opts.subject,
    text: opts.message,
    // html: opts.html,
    template: 'index',
    context: {
      username: data.username,
      email: data.email,
      createAt: data.date,
    },
  };

  const result = await transport.sendMail(info, function (err, info) {
    if (err) {
      console.log(`Error`, err);
    } else {
      console.log(`Message sent`);
    }
  });

  // console.log(result.messageId);
};

module.exports = sendMail;
