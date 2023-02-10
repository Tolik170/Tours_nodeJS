const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const validateToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (e) {
    return null;
  }
};

const resetPasswordToken = (user) => {
  const resetToken = crypto.randomBytes(32).toString('hex');

  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // expire in 10 min

  return resetToken; // also we need to send not encrypted version
};

module.exports = {
  generateToken,
  validateToken,
  resetPasswordToken,
};
