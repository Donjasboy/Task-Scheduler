const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

// Connection URL

mongoose.connect("mongodb://localhost:27017/schedulerDB",{ useNewUrlParser: true });



const app = express();
// important bodyParser setting
app.use(bodyParser.urlencoded({extended: true}));
// important for css inclusion
app.use(express.static("public"));

app.set('view engine', 'ejs');

const taskSchema = new mongoose.Schema({
  userId:String,
  title:String,
  description:String,
  username: String,
  created_Date: Date,
  start_Date:Date,
  end_Date:Date,
  Status:  Boolean
});

const Task = mongoose.model('Task', taskSchema);


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
  console.log("Server has started.");
}
app.listen(port);
