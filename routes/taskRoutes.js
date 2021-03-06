const express = require("express");
const taskController = require("./../controllers/TaskController");

const router = express.Router();
router.route("/")
    .get(taskController.getTasks)
    .post(taskController.createTask)


router.route("/:id")
    .get(taskController.getTask)
    .put(taskController.updateTask)

module.exports = router;
