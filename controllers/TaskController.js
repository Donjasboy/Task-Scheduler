const Task = require("./../models/Task");

exports.getTasks = (req, res) => {
    Task.find({}, function (err, foundTasks) {
        if (foundTasks) {
            res.status(200).json({
                message: "Successful ",
                data: foundTasks,
            });
        } else {
            res.send("no match found in the DB");
        }
    });
}

exports.getTask = function (req, res) {
    // get a specific object using the id
    Task.findOne({ _id: req.params.id }, function (err, task) {
        if (task) {
            res.status(200).json({
                message: "Successful ",
                data: task,
            });
        } else {
            res.send("no match found in the DB");
        }
    });
}