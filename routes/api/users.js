const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send("Welcome");
});

router.post("/register", async (req, res) => {
  res.status(200).send("register");
});

router.post("/login", async (req, res) => {
  res.status(200).send("login");
});

router.get("/allusers", async (req, res) => {
  res.status(200).send("user data");
});

module.exports = router;
