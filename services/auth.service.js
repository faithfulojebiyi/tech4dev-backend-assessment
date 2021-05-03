const ApiError = require("../utils/ApiError");
const userService = require("./user.service");

/**
 * Login with usename and password.
 * @param {string} email
 * @param {string} password
 * @return {Promise<User>}.
 */

const loginUserwithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(404, "Incorrect email or password");
  }
  return user;
};

module.exports = { loginUserwithEmailAndPassword };
