const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// import fetch from
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://sborwankar:dHBD3ULAQFhb7wNg@counter.umy2rrk.mongodb.net/level2"
  );
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
app.post("/addTask", (req, res) => {
  try {
    const name = req.body.name;
    const { title, description, status, dueDate } = req.body.tasks;
    res.status(200).send({ message: "added task" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
});
