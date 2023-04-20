import React, { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AddIcon from "@mui/icons-material/Add";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = ({ stateChanger }) => {
  //   const [taskList, setTaskList] = useState();
  //   const [user, setUser] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "inProgress",
    dueDate: new Date().toISOString().slice(0, 10),
  });
  const [startDate, setStartDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState("inProgress");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("sending req");
    console.log(task);

    const tasks = await axios.post("http://localhost:9002/addTask", {
      name: "Saumya",
      task,
    });
    if (tasks.status === 200) {
      //   console.log(tasks.data);
      const { message } = tasks.data;
      //   processItems(message);
      // console.log(message);
      stateChanger(message[0].tasks);
    } else {
      console.log("error");
    }
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    const { name, value } = event.target;
    console.log(name, value);
    setTask({
      ...task,
      [name]: value,
    });
    console.log(event.target.value, task);
  };

  return (
    <Popup trigger={<AddIcon></AddIcon>} modal nested>
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Add Task </div>
          <label>
            Title:{" "}
            <input name="title" value={task.title} onChange={handleChange} />
          </label>
          <br />
          <label>
            Description:
            <input
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Status:
            <label>
              <input
                type="radio"
                name="status"
                value="notStarted"
                checked={selectedValue === "notStarted"}
                onChange={handleRadioChange}
              />
              Not Started
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="inProgress"
                checked={selectedValue === "inProgress"}
                onChange={handleRadioChange}
              />
              In Progress
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="completed"
                checked={selectedValue === "completed"}
                onChange={handleRadioChange}
              />
              Completed
            </label>
          </label>
          <br />
          <label>
            Due Date:{" "}
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setTask({
                  ...task,
                  ["dueDate"]: date.toLocaleDateString(),
                });
              }}
            />
          </label>
          <br />
          {/* <button onClick={handleSubmit}>Submit</button> */}
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                handleSubmit();
                close();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default AddTask;
