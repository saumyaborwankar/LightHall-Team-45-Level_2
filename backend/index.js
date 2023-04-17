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
    { status: String, title: String, description: String, dueDate: String },
  ],
});
const UserTask = mongoose.model("user", userSchema);
