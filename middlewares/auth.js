const userModel = require('../models/userModel');
const {
  createUnauthorizedError,
  createForbiddenError,
} = require('../utils/errorHellpers');
const { validateToken } = require('../utils/token');

const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw createUnauthorizedError();
  }
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    throw createUnauthorizedError();
  }

  const userData = validateToken(token);

  if (!userData) {
    throw createUnauthorizedError();
  }
  // TODO: rework this await because function stack when error appears , maybe use promise instead async
  const user = await userModel.findById(userData.id);
  userData.role = user.role;
  req.user = userData;

  //! don`t see this next() when all okay, try to find next is not defined in async fun
  next();
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(createForbiddenError());
    }
    next();
  };
};

module.exports = { protect, restrictTo };
