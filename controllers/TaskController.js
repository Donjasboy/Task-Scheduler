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


exports.updateTask = function (req, res) {
    Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        username: req.body.username,
        start_Date: req.body.start_Date,
        end_Date: req.body.end_Date,
        status: req.body.status,
      },
      { new: true},
  
      function (err, results) {
        if (!err) {
          res.status(200).json({
            message: "Successfully updated ",
            data: results,
          });
        } else {
          res.send("no match found in the DB cant update: " + err.message);
        }
      }
    );
  }

  exports.createTask = function (req, res) {
    // Creating a Date object
    const dateObj = new Date();
    const currentTime = dateObj.toDateString() + "-" + dateObj.toTimeString();
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      username: req.body.username,
      created_Date: currentTime,
      start_Date: req.body.start_Date,
      end_Date: req.body.end_Date,
      status: req.body.status,
    });
  
    newTask.save(function (err) {
      if (!err) {
        res.status(201).json({
          message: "created a new task successful",
          data: newTask,
        });
      } else {
        res.status(400).json({
          message: "unable to save",
        });
      }
    });
  }