const express = require("express");
const users = require('./routes/api/users')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', users)
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port} at time ${new Date()}`);
});
