const firestore = require('../database');

const userCollection = firestore.db.collection('users');

exports.checkRegistered = async (req, res, next) => {
  const userDoc = await userCollection
    .where('email', '==', req.body.email)
    .get();

  if (!userDoc.empty) {
    return res(new errorres(`User already regestered`, 406));
    // res.statusCode = 406;
    // res.send({ message: 'User already present' });
  }

  next();
};
