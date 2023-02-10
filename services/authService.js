const crypto = require('crypto');
const { userErrors, errors } = require('../consts/errors');
const { comparePasswords } = require('../middlewares/passwordHellper');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const {
  createError,
  createNotFoundUserError,
} = require('../utils/errorHellpers');
const { generateToken, resetPasswordToken } = require('../utils/token');

const { ALREADY_EXIST, INCORRECT_CREDENTIALS } = userErrors;
const { RESET_PASSWORD } = errors;

const AuthService = {
  signup: async (body) => {
    const { name, email, photo, role, password, passwordConfirm } = body;

    const duplicatedUser = await User.findOne({ email }).exec();

    if (duplicatedUser) {
      throw createError(409, ALREADY_EXIST);
    }

    const newUser = await User.create({
      name,
      email,
      photo,
      role,
      password,
      passwordConfirm,
    });

    const token = generateToken({ id: newUser._id });

    return {
      newUser,
      token,
    };
  },

  login: async (email, password) => {
    const user = await User.findOne({ email }).select('+password').exec();

    if (!user || !(await comparePasswords(password, user.password))) {
      throw createError(401, INCORRECT_CREDENTIALS);
    }

    const token = generateToken({ id: user._id });

    return token;
  },

  updatePassword: async (currentPassword, newPassword, email) => {
    const user = await User.findOne({ email }).select('+password').exec();

    if (!user || !(await comparePasswords(currentPassword, user.password))) {
      throw createError(401, INCORRECT_CREDENTIALS);
    }

    user.password = newPassword;
    user.passwordConfirm = newPassword;

    await user.save();

    const newToken = generateToken({ id: user._id });

    return newToken;
  },

  forgotPassword: async (email, protocol, host) => {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw createNotFoundUserError();
    }

    const resetToken = resetPasswordToken(user);

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${protocol}://${host}/auth/resetPassword/${resetToken}`;

    const message = `Forgot your password? submit a new one at ${resetUrl}!`;

    await sendEmail({
      email: user.email,
      subject: 'Your password reset token is valid for 10 minutes!',
      message,
    });
  },

  resetPassword: async (token, newPassword, newPasswordConfirm) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).exec();

    if (!user) {
      throw createError(400, RESET_PASSWORD);
    }

    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const newToken = generateToken({ id: user._id });

    return newToken;
  },
};

module.exports = AuthService;
