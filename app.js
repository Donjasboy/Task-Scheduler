const express = require("express");
const bodyParser = require("body-parser");
const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

require("dotenv").config();
const app = express();
require("./config/database").connect();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/tasks", taskRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

// Connection URL
// Connection URL

//mongoose.connect("mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PWD+"@cluster0.f4lfn.mongodb.net/"+process.env.DB_NAME,{ useNewUrlParser: true });
//"mongodb+srv://admin-donjasboy:Test123@cluster0.f4lfn.mongodb.net/schedulerDB"

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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
