const UserService = require('../services/userService');

const updateMe = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body

  const updatedUser = await UserService.updateMe(id, updateData);

  res.status(200).json(updatedUser);
};

const getUsers = async (req, res) => {
  const users = await UserService.getUsers();

  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  res.status(200).json({
    message: 'get user by id',
    params: req.params,
    requestedAt: req.requestTime,
  });
};

const updateUser = async (req, res) => {
  res.status(200).json({
    message: 'update user by id',
    params: req.params,
    requestedAt: req.requestTime,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params

  await UserService.deleteUser(id)

  res.status(204).end()
};

module.exports = {
  updateMe,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
