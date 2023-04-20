const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// import fetch from
const dotenv = require("dotenv");
dotenv.config();
const { MONGO_DB } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
var ObjectId = require("mongodb").ObjectId;
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_DB);
}

const taskSchema = new mongoose.Schema({
  name: String,
  tasks: [
    { status: String, title: String, description: String, dueDate: String },
  ],
});
const UserTask = mongoose.model("tasks", taskSchema);

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

// const user2 = new User({
//   name: "Saumya",
//   password: "sam",
// });
// user2.save();
// const user1 = new UserTask({
//   name: "Saumya",
//   tasks: [
//     {
//       title: "Completing level 2 SESL",
//       description: "lol",
//       status: "inProgress",
//       dueDate: "1999-09-09",
//     },
//     {
//       title: "Completing level 2 SESL",
//       description: "lol",
//       status: "completed",
//       dueDate: "1999-09-09",
//     },
//   ],
// });
// user1.save();
app.get("/", (req, res) => {
  res.status(200).send("Hello from backend");
});

//Login
app.post("/login", (req, res) => {
  try {
    const { name, password } = req.body;
    User.findOne({ name: name }).then(async (entry) => {
      if (entry) {
        if (password === entry.password) {
          res.status(200).send({ message: name });
        }
      } else {
        res.status(250).send("wrong pass");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
});

//Register

// update task
app.post("/editTask", async (req, res) => {
  try {
    const userName = req.body.name;
    const { title, description, status, dueDate } = req.body.task;
    const _id = req.body.id;
    await UserTask.updateOne(
      { "tasks._id": _id },
      {
        $set: {
          "tasks.$.title": title,
          "tasks.$.description": description,
          "tasks.$.dueDate": dueDate,
          "tasks.$.status": status,
        },
      },
      { arrayFilters: [{ "xxx._id": _id }] }
    );
    UserTask.find({}).then((entries) => {
      res.status(200).send({ message: entries });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
});
// delete task
app.post("/deleteTask", async (req, res) => {
  try {
    const userName = req.body.name;
    // const { title, description, status, dueDate } = req.body.task;
    const _id = req.body.id;
    await UserTask.updateOne(
      { "tasks._id": _id },
      {
        $set: {
          "tasks.$.title": "",
          "tasks.$.description": "",
          "tasks.$.dueDate": "",
          "tasks.$.status": "deleted",
        },
      },
      { arrayFilters: [{ "xxx._id": _id }] }
    );
    UserTask.find({}).then((entries) => {
      res.status(200).send({ message: entries });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
});

// get task list
app.get("/getTasks", (req, res) => {
  try {
    UserTask.find({}).then((entries) => {
      res.status(200).send({ message: entries });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
});
// Route for adding a new task and returning a list of updated tasks
app.post("/addTask", (req, res) => {
  try {
    // console.log(req.body);
    const userName = req.body.name;
    const { title, description, status, dueDate } = req.body.task;
    // console.log(userName, title, description, status, dueDate);
    UserTask.findOne({ name: userName }).then(async (entry) => {
      if (entry) {
        entry.tasks.push({
          title: title,
          description: description,
          status: status,
          dueDate: dueDate,
        });
        await entry.save();
        UserTask.find({}).then((entries) => {
          res.status(200).send({ message: entries });
        });
      } else {
        res.status(250).send({ message: "no user found" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
});

app.listen(process.env.PORT || 9002, () => {
  console.log("Backend started at port 9002");
});
