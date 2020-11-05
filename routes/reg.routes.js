const controller = require('../controllers/reg.controller');
const regMiddleware = require('../middlewares/reg.middleware');
const emailMiddleware = require('../middlewares/email.middleware');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.post(
    '/api/user/register',
    [emailMiddleware.checkEmail, regMiddleware.checkRegistered],
    controller.register
  );
};
