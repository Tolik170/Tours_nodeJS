const AuthService = require('../services/authService');

const oneDayInMs = 86400000;

const cookieOptions = {
  maxAge: oneDayInMs,
  httpOnly: true,
};

if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

const signup = async (req, res) => {
  const { newUser, token } = await AuthService.signup(req.body);

  if (newUser && token) {
    res.cookie('jwt', token, cookieOptions);
    newUser.password = undefined; //* remove password from the output
  }

  res.status(200).json({ token, newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const token = await AuthService.login(email, password);

  if (token) {
    res.cookie('jwt', token, cookieOptions);
  }

  res.status(200).json({
    status: 'success',
    token,
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { protocol } = req;
  const host = req.get('host');

  await AuthService.forgotPassword(email, protocol, host);

  res.status(200).json({
    status: 'success',
    message: 'Reset token was successfully created and sended to the email!',
  });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { passwordConfirm, password } = req.body;

  const newToken = await AuthService.resetPassword(
    token,
    password,
    passwordConfirm
  );

  res.status(200).json({
    status: 'success',
    newToken,
  });
};

const updatePassword = async (req, res) => {
  const { password, newPassword, email } = req.body;

  const newToken = await AuthService.updatePassword(
    password,
    newPassword,
    email
  );

  res.status(200).json({
    status: 'success',
    newToken,
  });
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
};
