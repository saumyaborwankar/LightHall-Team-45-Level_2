import React, { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddIcon from "@mui/icons-material/Add";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddTask from "./addTask";
import Dropdown from "react-bootstrap/Dropdown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import EditTask from "./editTask";
import { FaSortDown } from "react-icons/fa";
import BasicExample from "./dropdown";
// import Dropdown from "./dropdown";
// library.add(fab, faCheckSquare, faCoffee);
const TaskTracker = (props) => {
  const [taskList, setTaskList] = useState();
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(props.user);
    const fetchData = async () => {
      const reponse = await axios.get("http://localhost:9002/getTasks");
      if (reponse.status === 200) {
        console.log("jw ii", reponse.data.message[0].tasks);
        setTaskList(reponse.data.message[0].tasks);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (user, row) => {
    console.log(user, row);
    console.log("dee");
    const tasks = await axios.post("http://localhost:9002/deleteTask", {
      name: props.user,
      // task: row,
      id: row._id,
    });
    if (tasks.status === 200) {
      //   console.log(tasks.data);
      const { message } = tasks.data;
      //   processItems(message);
      // console.log(message);
      setTaskList(message[0].tasks);
    } else {
      console.log("error");
    }
  };
  const handleSort = () => {
    console.log("srot");
  };
  return (
    <div>
      <h1>Task Tracker</h1>
      <div>
        {user}
        <BasicExample taskList={taskList} />
      </div>

      {/* <Dropdown /> */}
      <div className="tasks">
        {taskList ? (
          taskList.map((row) => {
            if (row.status != "deleted") {
              return (
                <div>
                  "{row.title}" "{row.description}" "{row.status}" "
                  {row.dueDate}"
                  <EditTask task={row} user={user} stateChanger={setTaskList} />
                  <RiCloseCircleLine
                    onClick={() => handleDelete(user, row)}
                    className="edit-icon"
                  />
                </div>
              );
            }
          })
        ) : (
          <div></div>
        )}
      </div>
      <AddTask stateChanger={setTaskList} />
    </div>
  );
};

export default TaskTracker;
