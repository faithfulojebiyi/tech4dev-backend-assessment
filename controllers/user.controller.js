const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const getUsers = catchAsync(async (req, res) => {
  const pageNumber = req.query.page;
  const pageSize = 20;
  const skip = (pageNumber - 1) * pageSize;
  const limit = pageSize;
  const user = await userService.getAllUsers(skip, limit);
  res.status(200).json({
    message: "API response messsage",
    status: "success",
    data: user,
  });
});

module.exports = { getUsers };
