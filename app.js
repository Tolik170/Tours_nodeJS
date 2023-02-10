const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const router = require('./routes/route');
const { MONGODB_URL, CONNECT_OPTIONS } = require('./configs/config');
const errorMiddleware = require('./middlewares/errorHandling');
const { createNotFoundError } = require('./utils/errorHellpers');
const { rateLimiter } = require('./utils/rateLimiting');

// TODO: Refactor this file(make it look better).

dotenv.config({ path: './config.env' });
mongoose
  .connect(MONGODB_URL, CONNECT_OPTIONS)
  .then(() => console.log('DB connection successful'));

const app = express();
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());
app.use('*', rateLimiter);
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'difficulty',
      'price',
    ],
  })
);
app.use(express.static(`${__dirname}/public`));
app.use('/', router);
app.use((_req, _res, next) => {
  next(createNotFoundError());
});
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
