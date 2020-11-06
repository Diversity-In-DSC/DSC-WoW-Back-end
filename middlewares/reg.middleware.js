const firestore = require('../database');
const errorres = require('../utils/errorres');

const userCollection = firestore.db.collection('users');

exports.checkRegistered = async (req, res, next) => {
  const userDoc = await userCollection
    .where('email', '==', req.body.email)
    .get();

  if (!userDoc.empty) {
    return next(new errorres(`User already regestered`, 400));
    // res.statusCode = 406;
    // res.send({ message: 'User already present' });
  }

  next();
};
