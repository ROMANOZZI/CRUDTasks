import mongoose from "mongoose";
import express from "express";
import cors from "cors";
const app = express();
const port = 3000;
// Middlewares
app.use(cors());
app.use(express.json());
// Connect to DB
mongoose
  .connect("mongodb://localhost:27017/tasks")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Not Connected to database", err);
  });
// Schema
const schema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  isCompleted: Boolean,
});

const task = mongoose.model("1", schema);
// Routes
// get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await task.find({});
  res.send(tasks);
});
// get task by id
app.get("/tasksbyId", async (req, res) => {
  const required = await task.find({ _id: req.body.id });
  res.send(required);
});
// add task
app.post("/addtask", async (req, res) => {
  const newTask = new task({
    taskName: req.body.taskName,
    description: req.body.description,
    dueDate: req.body.dueDate,
    isCompleted: req.body.isCompleted,
  });
  await newTask.save();
  res.send(newTask);
});
// update task
app.put("/updatetask", async (req, res) => {
  console.log(req.body);
  const updatedTask = await task.updateOne(
    { _id: req.body._id },
    {
      taskName: req.body.taskName,
      description: req.body.description,
      dueDate: req.body.dueDate,
      isCompleted: req.body.isCompleted,
    }
  );
  res.send(updatedTask);
});
app.put("/taskCompleted", async (req, res) => {
  const updatedTask = await task.updateOne(
    { _id: req.body.id },
    { isCompleted: req.body.isCompleted }
  );

  res.send(updatedTask);
});
// delete task

// delete task
app.delete("/deletetask/:id", async (req, res) => {
  console.log(req.params.id);
  task
    .findByIdAndDelete(JSON.parse(req.params.id).id)
    .exec()
    .then(() => {
      res.send(req.params.id + "  deleted successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});
// Start the server
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
