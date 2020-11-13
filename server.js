const express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/error');

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

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/api/', apiLimiter);

app.get('/', (req, res) => {
  res.send('We know what you are doing. :) If you see any bug do inform us.')
})

require('./routes/reg.routes')(app);
require('./routes/contact.routes')(app);

app.use(errorHandler);

app.listen(PORT || 3000, function () {
  console.log('Server is running on Port: ' + (PORT || 3000));
});
