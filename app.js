const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Task = require("./models/Task");
const taskRouter = require("./routes/taskRoutes")

// Connection URL
// Connection URL

mongoose.connect("mongodb+srv://admin-donjasboy:Test123@cluster0.f4lfn.mongodb.net/schedulerDB",{ useNewUrlParser: true });

// mongoose.connect("mongodb://localhost:27017/schedulerDB", {
//   useNewUrlParser: true,
// });

// middlewares

// app.use((req,res,next)=>{
//   req.isAuth =  false;
//   next()
// })

// app.use((req,res,next)=>{
//   if(req.isAuth == false){
//     res.status(400).send("Error message");
//   }
//   next()
// })

// important bodyParser setting
app.use(bodyParser.urlencoded({ extended: true }));

// app.post("/tasks", function (req, res) {
//   // Creating a Date object
//   const dateObj = new Date();
//   const currentTime = dateObj.toDateString() + "-" + dateObj.toTimeString();
//   const newTask = new Task({
//     title: req.body.title,
//     description: req.body.description,
//     username: req.body.username,
//     created_Date: currentTime,
//     start_Date: req.body.start_Date,
//     end_Date: req.body.end_Date,
//     status: req.body.status,
//   });

//   newTask.save(function (err) {
//     if (!err) {
//       res.status(201).json({
//         message: "created a new task successful",
//         data: newTask,
//       });
//     } else {
//       res.status(400).json({
//         message: "unable to save",
//       });
//     }
//   });
// });
// app.put("/tasks/:id", function (req, res) {
//   Task.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: req.body.title,
//       description: req.body.description,
//       username: req.body.username,

//       start_Date: req.body.start_Date,
//       end_Date: req.body.end_Date,
//       status: req.body.status,
//     },

//     function (err, results) {
//       if (!err) {
//         res.status(200).json({
//           message: "Successfully updated ",
//           data: results,
//         });
//       } else {
//         res.send("no match found in the DB cant update: " + err.message);
//       }
//     }
//   );
// });

app.use("/tasks", taskRouter);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, ()=>{
  console.log(`Server has started on port ${port}`);
});
