const catchAsync = require("../utils/catchAsync");
const { signUserToken } = require("../utils/jwtHelper");
const { authService, userService } = require("../services");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).send({
    status: "created",
    data: user.email,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserwithEmailAndPassword(email, password);
  const data = {
    firstName: user.firstName,
    sureName: user.sureName,
    email: user.email,
  };
  const token = await signUserToken(data);
  res.status(200).send({
    status: "ok",
    data: data,
    token: token,
  });
});

module.exports = {
  register,
  login,
};
