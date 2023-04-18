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

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_DB);
}

app.listen(process.env.PORT || 9002, () => {
  console.log("Backend started at port 9002");
});
const userSchema = new mongoose.Schema({
  name: String,
  tasks: [
    { status: Number, title: String, description: String, dueDate: String },
  ],
});
const UserTask = mongoose.model("user", userSchema);

// const user1 = new UserTask({
//   name: "Saumya",
//   tasks: [
//     {
//       title: "Completing level 2 SESL",
//       description: "lol",
//       status: 0,
//       dueDate: "1999-09-09",
//     },
//     {
//       title: "Completing level 2 SESL",
//       description: "lol",
//       status: 0,
//       dueDate: "1999-09-09",
//     },
//   ],
// });
// user1.save();
app.get("/", (req, res) => {
  res.status(200).send("Hello from backend");
});

// Route for adding a new task and returning a list of updated tasks
app.post("/addTask", (req, res) => {
  try {
    const userName = req.body.name;
    const { taskTitle, taskDescription, taskStatus, taskDueDate } =
      req.body.tasks;
    UserTask.findOne(
      { name: userName }.then(async (entry) => {
        if (entry) {
          entry.tasks.push({
            title: taskTitle,
            description: taskDescription,
            status: taskStatus,
            dueDate: taskDueDate,
          });
          await entry.save();
          UserTask.find({}).then((entries) => {
            res.status(200).send({ message: entries });
          });
        } else {
          res.status(250).send({ message: "no user found" });
        }
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
});
