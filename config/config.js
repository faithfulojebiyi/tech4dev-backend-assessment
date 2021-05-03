const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mongoose: {
    url: process.env.DATABASE,
    options: {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
