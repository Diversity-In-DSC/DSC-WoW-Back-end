const express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
app.set('trust proxy', 1);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

const PORT = process.env.PORT;

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: 'We dont allow too many requests from same IP.' },
});

app.use('/api/', apiLimiter);

require('./routes/reg.routes')(app);
require('./routes/contact.routes')(app);

app.listen(PORT || 3000, function () {
  console.log('Server is running on Port: ' + (PORT || 3000));
});
