const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.status(200).send("Welcome");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port} at time ${new Date()}`);
});
