const express = require("express");
const { userController } = require("../../controllers");
const { verifyUserToken } = require("../../utils/jwtHelper");

const router = express.Router();

router.get("/", verifyUserToken, userController.getUsers);

module.exports = router;
