const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  userId: String,
  title: {
    type: String,
    required: [true, "a task must have a title"],
  },
  description: String,
  username: String,
  created_Date: Date,
  start_Date: Date,
  end_Date: {
    type: Date,
    validate: {
      // comparing the fields
      validator: function checkDates(value) {
        return value > this.start_Date;
      },
      message: "is not a valid date!",
    },
  },

  status: String,
});
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
