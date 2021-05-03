const express = require("express");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const mongoose = require("mongoose");
const config = require("./config/config");
const ApiError = require("./utils/ApiError");
// const { errorConverter, errorHandler } = require("./middlewares/error");

mongoose.connect(config.mongoose.url, config.mongoose.options);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", auth);
app.use("/allusers", users);

app.all("*", (req, res, next) => {
  const err = new ApiError(400, `Requested URL ${req.path} not found`);
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port} at time ${new Date()}`);
});
