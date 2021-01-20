const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  listName: {
    type: String,
    required: true,
  },
  taskList: [
    {
      title: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
});

module.exports = Task = mongoose.model("task", taskSchema);
