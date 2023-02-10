const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'To many request from this ip, please try again in an hour!',
});

  module.exports = {
    rateLimiter
  };