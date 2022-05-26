const Task = require("./../models/Task");

exports.getTasks = async (req, res) => {
  
  const userName = req.principal.userName;
  
  let tasks = await Task.find({ username:userName  });
 
//console.log(tasks);
  res.status(200).json({
    message: "Successful ",
    data: tasks,
  });
// } else {
//   res.status(400).json({
//     message: "can't get all tasks",
//   });
// }
};

exports.getTask = async (req, res) => {
  // get a specific object using the id
  let findTask = await Task.findOne({ _id: req.params.id });
  if(findTask){
    if (findTask.username === req.principal.userName) {
      res.status(200).json({
        message: "Successful ",
        data: findTask,
      });
    } else {
      res.status(400).json({
        message: "failed ",
      });
    }
  }else{
    res.status(400).json({
      message: "Invalid Id",
    });
  }
  
};

exports.updateTask = async (req, res) => {
 let findTask = await Task.findOne({  _id: req.params.id  });
 // same as if(findtask){
//    if(findTask.username === req.principal.userName){}
//  }
 if (findTask && findTask.username === req.principal.userName) {
    //get a specific object using the parameter where the id is supplied  and update
    let updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        start_Date: req.body.start_Date,
        end_Date: req.body.end_Date,
        status: req.body.status,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Successfully updated ",
      data: updateTask,
    });
  } else {
    res.status(400).json({
      message: "invalid ID",
    });
  }
};

exports.createTask = async (req, res) => {
  // Creating a Date object
  const dateObj = new Date();
  const currentTime = dateObj.toDateString() + "-" + dateObj.toTimeString();
  const userName = req.principal.userName;
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    username: userName,
    created_Date: currentTime,
    start_Date: req.body.start_Date,
    end_Date: req.body.end_Date,
    status: req.body.status,
  });

  let saveNewTask = await newTask.save();
  res.status(201).json({
    message: "created a new task successful",
    data: saveNewTask,
  });
};
