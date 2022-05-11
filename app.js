const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

// Connection URL

mongoose.connect("mongodb://localhost:27017/schedulerDB",{ useNewUrlParser: true });



const app = express();
// important bodyParser setting
app.use(bodyParser.urlencoded({extended: true}));

const taskSchema = new mongoose.Schema({
  userId:String,
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  created_Date:Date,
  start_Date:Date,
  end_Date:Date,
  status:  String
});

const Task = mongoose.model('Task', taskSchema);
app.post("/tasks", function(req, res){
  // Creating a Date object
  const dateObj = new Date();
  const currentTime = dateObj.toDateString()+'-'+dateObj.toTimeString()
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    username: req.body.username,
    created_Date:currentTime,
    start_Date: req.body.start_Date,
    end_Date: req.body.end_Date,
    status: req.body.status
  });

  newTask.save(function(err){
    if (!err){
      res.status(201).json({
        message: "created a new task successful",
        data:newTask
      });
    } else {
      res.status(400).json({
        message:"unable to save"});
     
        
    }
  });
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
  console.log("Server has started.");
  
  
}
app.listen(port);
