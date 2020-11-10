const firestore = require('../database');
const sendMail = require('../utils/sendMail');
var randomstring = require("randomstring");

const userCollection = firestore.db.collection('users');

exports.register = (req, res) => {
  const userRegisterRef = userCollection.doc();

  let uId = randomstring.generate(6);

  userRegisterRef
    .set({
      userID: uId,
      username: req.body.name,
      email: req.body.email,
      ref: req.body.ref,
      createdAt: Date.now(),
    })
    .then((dbRes) => {
      if (dbRes) {
        try {
          let today = new Date();
          let dd = today.getDate();
          let mm = today.getMonth() + 1;

          let yyyy = today.getFullYear();
          if (dd < 10) {
            dd = '0' + dd;
          }
          if (mm < 10) {
            mm = '0' + mm;
          }
          let date = dd + '/' + mm + '/' + yyyy;

          sendMail(
            {
              email: `test@gmail.com`,
              subject: `Regetration Success`,
              message: `You have successfully regesteredfor DSC-Wow`,
              // html: template,
            },
            {
              username: req.body.username,
              email: req.body.email,
              date: date,
            }
          )
            .then()
            .catch((err) => {
              if (err) {
                return res.status(500).json({
                  message: 'Mail api problem detected',
                });
              }
            });

          res.status(200).json({
            message: 'User Registered Successfully',
            referralLink: `https://dscwow.tech?ref=${uId}`
          });
        } catch (error) {
          next(error);
        }
      }
    })
    .catch((err) => {
      if (err) {
        // return next(new errorres(`Something went wrong`, 500));
        res.statusCode = 500;
        res.send({ message: 'Something went wrong' });
        return;
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
