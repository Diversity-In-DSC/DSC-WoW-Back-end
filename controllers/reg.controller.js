const firestore = require('../database');

const userCollection = firestore.db.collection('users');

exports.register = (req, res) => {
  const userRegisterRef = userCollection.doc();

  userRegisterRef
    .set({
      username: req.body.username,
      email: req.body.email,
      createAt: Date.now(),
    })
    .then((dbRes) => {
      if (dbRes) {
        res.send({ message: 'User Registered Successfully' });
      }
    })
    .catch((err) => {
      if (err) {
        return res(new errorres(`Something went wrong`, 500));
        // res.statusCode = 500;
        // res.send({ message: 'Something went wrong' });
      }
    });
};

// Async example
// exports.register = async (req, res) => {
//   try {
//     const userRegisterRef = userCollection.doc();

//     const stat = await userRegisterRef.set({
//       username: req.body.username,
//       email: req.body.email,
//       createAt: Date.now(),
//     });

//     res.send({ message: 'User Registered Successfully' });
//   } catch (error) {
//     next(error);
//   }
// };
