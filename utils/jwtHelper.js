const jwt = require("jsonwebtoken");
// const bcrypt = require ('bcrypt')

module.exports = {
  signUserToken: (user) => {
    return new Promise((resolve, reject) => {
      const payload = { user };
      const secret = process.env.JWT_USER_SECRET;
      const options = {
        expiresIn: "2d",
        issuer: "faithfulojebiyi",
        audience: user.email,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(token);
      });
    });
  },

  verifyUserToken: (req, res, next) => {
    if (!req.headers.authorization)
      return res.status(401).send({
        message: "please login",
        status: "failed",
        data: null,
      });
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    jwt.verify(token, process.env.JWT_USER_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).send({
            message: "Token expired re-login",
            status: "failed",
            data: null,
          });
        } else
          return res.status(403).send({
            message: "Token is Invalid",
            status: "failed",
            data: null,
          });
      }
      req.payload = payload;
      next();
    });
  },
};
