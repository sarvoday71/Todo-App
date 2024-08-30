const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.9q26bgj.mongodb.net/todo2")
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Error occured"));

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
