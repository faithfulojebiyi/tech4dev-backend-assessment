const express = require("express");
const { authController } = require("../../controllers");

const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send("Welcome");
});

router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;
