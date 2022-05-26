const express = require("express");
const taskController = require("./../controllers/TaskController");
const AuthController = require("./../controllers/AuthController");
const router = express.Router();
router.route("/")
    .get(AuthController.protect, taskController.getTasks)
    .post(AuthController.protect, taskController.createTask)


router.route("/:id")
    .get(AuthController.protect, taskController.getTask)
    .put(AuthController.protect, taskController.updateTask)

module.exports = router;
