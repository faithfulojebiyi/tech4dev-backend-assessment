const catchAsync = require("../utils/catchAsync");
const { signUserToken } = require("../utils/jwtHelper");
const { authService, userService } = require("../services");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = await signUserToken(user);
  res.status(201).json({ user, token });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserwithEmailAndPassword(email, password);
  const token = await signUserToken(user);
  res.status(200).json({ user, token });
});

module.exports = {
  register,
  login,
};
