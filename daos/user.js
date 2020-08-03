const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(12);

module.exports = {};

// updateUserPassword(userId, password) - should update the user's password field
module.exports.updateUserPassword = async (userId, password) =>  {
  password = bcrypt.hashSync(password, salt);

  return await User.updateOne(
    { _id: mongoose.Types.ObjectId(userId) },
    {
      $set: { password: password },
      $currentDate: { lastModified: true }
    }
  )
};

module.exports.getById = async (userId) => {
  return await User.findOne({ _id: userId }).lean();
}

module.exports.getByEmail = async (email) => {
  const user =  await User.findOne({ email: email }).lean();
  return user;
}

module.exports.deleteByUserId = async (userId) => {
  return await User.delete({ _id: mongoose.Types.ObjectId(userId) });
}

module.exports.create = async (userData) => {
  userData.password = bcrypt.hashSync(userData.password, salt);
  const created = await User.create(userData);
  return created;
}
