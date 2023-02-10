const User = require('../models/userModel');
const { createNotFoundUserError } = require('../utils/errorHellpers');

const UserService = {
  updateMe: async (id, updateData) => {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updatedUser) {
      throw createNotFoundUserError();
    }

    return updatedUser;
  },

  getUsers: async () => {
    const tours = await User.find().exec();

    return tours;
  },

  deleteUser: async (id) => {
    const user = await User.findByIdAndRemove(id).exec();

    if (!user) {
      throw createNotFoundUserError();
    }
  },
};

module.exports = UserService;
