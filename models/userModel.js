const { Schema, model } = require('mongoose');
const validator = require('validator');
const { hashPassword, changedPasswordAt } = require('../middlewares/passwordHellper');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The user must have a name'],
    unique: true,
    trim: true,
    maxLength: [30, 'The max length of name is 30 words'],
  },
  email: {
    type: String,
    required: [true, 'The user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'The user must have a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (passwordConfirm) {
        return passwordConfirm === this.password;
      },
      message: 'Passwords must match',
    },
  },
  passwordChangedAt: {
    type: Date
  },
  passwordResetToken: {
    type: String,
    required: false,
    default: null,
  },
  passwordResetExpires: {
    type: Date,
    default: null,
  },
});

UserSchema.pre('save', hashPassword);

UserSchema.pre('save', changedPasswordAt);

module.exports = model('User', UserSchema);
