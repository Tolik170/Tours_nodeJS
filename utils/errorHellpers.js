const { errors, userErrors } = require('../consts/errors');

const { NOT_FOUND, UNAUTHORIZED, FORBIDDEN } = errors;
const { USER_NOT_FOUND } = userErrors;

const createError = (status, errorInfo) => {
  const err = new Error(errorInfo.message);
  err.status = status;
  err.code = errorInfo.code;

  return err;
};

const createUnauthorizedError = () => {
  return createError(401, UNAUTHORIZED);
};

const createForbiddenError = () => {
  return createError(403, FORBIDDEN);
};

const createNotFoundError = () => {
  return createError(404, NOT_FOUND);
};

const createNotFoundUserError = () => {
  return createError(404, USER_NOT_FOUND);
};

module.exports = {
  createError,
  createNotFoundError,
  createUnauthorizedError,
  createForbiddenError,
  createNotFoundUserError,
};
