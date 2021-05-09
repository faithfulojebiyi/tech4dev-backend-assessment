const rateLimit = require("../utils/requestLimit");

const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
});

module.exports = limiter;
