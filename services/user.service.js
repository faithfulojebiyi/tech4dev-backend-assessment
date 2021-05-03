const { User } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Creates a user.
 * @param {Object} userBody
 * @return {Promise<User>}.
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(400, "Email already taken");
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Finds a user by email.
 * @param {string} email
 * @return {Promise<User>}.
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Fetches all users.
 * @return {Promise<User>}.
 */
const getAllUsers = async (skip, limit) => {
  return User.find({})
    .select(["-_id", "-createdAt", "-updatedAt", "-password", "-__v"])
    .skip(skip)
    .limit(limit);
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
};
