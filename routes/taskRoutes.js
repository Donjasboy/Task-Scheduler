const express = require("express");
const taskController = require("./../controllers/TaskController");

const router = express.Router();
router.route("/")
    .get(taskController.getTasks)

router.route("/:id")
    .get(taskController.getTask)

module.exports = router;
