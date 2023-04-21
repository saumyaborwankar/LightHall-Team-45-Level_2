import React, { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "./Task";
import { AddTaskForm } from "./AddTaskForm";
import { EditTaskForm } from "./EditTaskForm";
import DeleteIcon from "@mui/icons-material/Delete";
import Sort from "../dropdownSort/Sort";
// import {
//   setSession,
//   getSession,
//   clearSession,
// } from "../SessionProvider/SessionProvider";
export const TaskList = (props) => {
  const [user, setUser] = useState(props.user);
  const [taskList, setTaskList] = useState();

  // const [token, setToken] = useState(null);
  // const [expiry, setExpiry] = useState(null);

  useEffect(() => {
    // setUser(props.user);
    // console.log("task tracker started for", { user });
    const fetchData = async () => {
      const reponse = await axios.post("http://localhost:9002/getTasks", {
        name: user,
      });
      if (reponse.status === 200) {
        console.log("jw ii", reponse.data.message[0].tasks);
        setTaskList(reponse.data.message[0].tasks);
      }
    };
    fetchData();
    // console.log("task tracker opened for", { user });

    // const session = getSession();
    // if (session) {
    //   setUser(session.user);
    //   setToken(session.token);
    //   setExpiry(session.expiry);
    // }
  }, []);
  const handleDelete = async (user, row) => {
    console.log(user, row);
    // console.log("dee");
    const tasks = await axios.post("http://localhost:9002/deleteTask", {
      name: user,
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

  const handleLogout = () => {
    // clearSession();
    // setUser(null);
    // setToken(null);
    // setExpiry(null);
    console.log("logout");
  };

  return (
    <div>
      <div>TaskList for {user}</div>
      <Sort taskList={taskList} setTaskList={setTaskList} />
      <button onClick={handleLogout}>Logout</button>
      <div className="tasks">
        {taskList ? (
          taskList.map((row) => {
            if (row.status != "deleted") {
              return (
                <div>
                  <Task row={row} />
                  <EditTaskForm
                    row={row}
                    user={user}
                    setTaskList={setTaskList}
                  />
                  <DeleteIcon
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
      <AddTaskForm user={user} setTaskList={setTaskList} />
    </div>
  );
};
