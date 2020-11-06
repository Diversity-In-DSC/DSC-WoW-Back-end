const { restart } = require('nodemon');
const errorres = require('../utils/errorres');

const errorHandler = (err, req, res, next) => {
  console.log(err);

  let error = { ...err };
  error.message = err.message;

  // ValidationError (Note : Check for firestore specific errors here)
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorres(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || `Server error` });
};

module.exports = errorHandler;
