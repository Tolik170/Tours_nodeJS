const bcrypt = require('bcryptjs');

async function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
  }
  next();
}

async function changedPasswordAt(next) {
  if (this.isModified('password') && !this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
    console.log(this)
  }
  next();
}

const comparePasswords = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

module.exports = {
  hashPassword,
  changedPasswordAt,
  comparePasswords,
};
