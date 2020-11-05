const firestore = require('../database');

const contactUsColl = firestore.db.collection('contactUs');

exports.contactUs = (req, res) => {
  const contactUsRef = contactUsColl.doc();

  contactUsRef
    .set({
      username: req.body.username,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      createAt: Date.now(),
    })
    .then((dbRes) => {
      if (dbRes) {
        res.send({ message: 'We will contact you soon.' });
      }
    })
    .catch((err) => {
      if (err) {
        res.statusCode = 500;
        res.send({ message: 'Something went wrong' });
      }
    });
};
