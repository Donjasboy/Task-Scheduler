const express = require("express");
const userController = require("./../controllers/userController");
const AuthController = require("./../controllers/AuthController");
const router = express.Router();

router.route("/:id")
.get(AuthController.protect, userController.getUser)
.put(AuthController.protect, userController.updateUser);

module.exports = router;
