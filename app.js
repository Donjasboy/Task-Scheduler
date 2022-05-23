
require ('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
// const Task = require("./models/Task");
// const User = require("./models/User");
const taskRouter = require("./routes/taskRoutes")
const userRouter = require("./routes/userRoutes")

// Connection URL
// Connection URL

mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true });

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

app.use("/tasks", taskRouter);
app.use("/users", userRouter);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, ()=>{
  console.log(`Server has started on port ${port}`);
});
