const Task = require("./../models/Task");

exports.getTasks = async (req, res) => {
  let tasks = await Task.find();

  res.status(200).json({
    message: "Successful ",
    data: tasks
  });
}

exports.getTask = async (req, res) => {
  // get a specific object using the id
  let findTask = await Task.findOne({ _id: req.params.id });
      res.status(200).json({
        message: "Successful ",
        data: findTask
      });

}


exports.updateTask = async (req, res) => {
  let updateTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      username: req.body.username,
      start_Date: req.body.start_Date,
      end_Date: req.body.end_Date,
      status: req.body.status,
    },
    { new: true }
    )
    res.status(200).json({
      message: "Successfully updated ",
      data: updateTask,
    })
}

exports.createTask  = async (req, res) =>{
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
 
  let saveNewTask = await newTask.save()
      res.status(201).json({
        message: "created a new task successful",
        data: saveNewTask,
      });
}