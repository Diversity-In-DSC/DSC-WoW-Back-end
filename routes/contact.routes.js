const controller = require("../controllers/contact.controller");
const emailMiddleware = require("../middlewares/email.middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/contactus", emailMiddleware.checkEmail ,controller.contactUs);
};