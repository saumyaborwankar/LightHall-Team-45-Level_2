import React, { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AddIcon from "@mui/icons-material/Add";
const TaskTracker = (props) => {
  const [user, setUser] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: 0,
    dueDate: "",
  });

  useEffect(() => {
    setUser(props.user);
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    console.log("sending req");
    const tasks = await axios.post("http://localhost:9002/addTask", {
      name: "Saumya",
      task,
    });
    if (tasks.status === 200) {
      //   console.log(tasks.data);
      const { message } = tasks.data;
      //   processItems(message);
      console.log(message);
    }
  };
  return (
    <div>
      <h1>Task Tracker</h1>
      <div>{user}</div>
      {/* <div className="tasks">{task}</div> */}
      <svg data-testid="AddIcon"></svg>

      <Popup trigger={<AddIcon></AddIcon>} modal nested>
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Add Task </div>
            {/* <div className="content"> hii</div> */}
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
              <input
                name="status"
                value={task.status}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Due Date:
              <input
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
              />
            </label>
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <div className="actions">
              {/* <Popup
                trigger={<button className="button"> Trigger </button>}
                position="top center"
                nested
              >
                <span>btttt</span>
              </Popup> */}
              <button
                className="button"
                onClick={() => {
                  console.log("modal closed ");
                  close();
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default TaskTracker;
