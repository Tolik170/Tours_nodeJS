const errors = {
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'The requested URL was not found.',
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'The requested URL requires user authorization.',
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: 'You do not have permission to perform this action.',
  },
  RESET_PASSWORD: {
    code: 'RESET_PASSWORD',
    message: 'The user doesn`t exist or token is not valid or has expired',
  },
};

const tourErrors = {
  TOUR_NOT_FOUND: {
    code: 'TOUR_NOT_FOUND',
    message: 'Tour with the specified id was not found.',
  },
  ALREADY_EXIST: {
    code: 'ALREADY_EXIST',
    message: 'The tour with this name already exist.',
  },
};

const userErrors = {
  ALREADY_EXIST: {
    code: 'ALREADY_EXIST',
    message: 'The user with this email already exist.',
  },
  INCORRECT_CREDENTIALS: {
    code: 'INCORRECT_CREDENTIALS',
    message: 'The password or email you entered is incorrect.',
  },
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: 'User with the specified email or id was not found.'
  },
};

module.exports = {
  tourErrors,
  userErrors,
  errors,
};
