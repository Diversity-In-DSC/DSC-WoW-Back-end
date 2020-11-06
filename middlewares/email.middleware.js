const firestore = require('../database');
const errorres = require('../utils/errorres');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.checkEmail = (req, res, next) => {
  const isEmail = emailRegexp.test(req.body.email);

  if (!isEmail) {
    return next(new errorres(`Invalid email`, 406));
    // res.statusCode = 406;
    // res.send({ message: 'Email not valid' });
  }

  next();
};
