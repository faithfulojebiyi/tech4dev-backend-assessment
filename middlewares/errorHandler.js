const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  const statusCode = err.statusCode || 500;

  if (err.isOperational) {
    res.status(statusCode).send({
      message: err.message,
    });
  } else {
    res.status(statusCode).send({
      message: "something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};
