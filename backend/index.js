const express = require("express");
const cors = require("cors");

const Todo = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await Todo.find();

    res.json(allTodos);
  } catch (e) {
    console.log(e);
    res.json({ message: "Error while creating" });
  }
});

app.post("/todo", async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTodo = await Todo.create({ title, description });
    console.log(newTodo);
    res.json({ message: "Todo Created successfully" });
  } catch (e) {
    console.log(e);
    res.json({ message: "Error while creating todo" });
  }
});

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const deletedTodo = await Todo.findByIdAndDelete(id);

  if (deletedTodo) {
    console.log(deletedTodo);
    res.json({ message: "Todo deleted successfully" });
  } else {
    res.json({ message: "Error occured" });
  }
});

app.put("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const updatedTodo = await Todo.findByIdAndUpdate(id, {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  });
  console.log(updatedTodo);
  res.json({ message: "Todo updated successfully" });
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
