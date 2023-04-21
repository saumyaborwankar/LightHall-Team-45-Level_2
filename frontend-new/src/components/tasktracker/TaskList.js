import React, { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "./Task";
import { AddTaskForm } from "./AddTaskForm";
import "./Task.css";
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
        // console.log("jw ii", reponse.data.message[0].tasks);
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
    // <div>
    //   <div>TaskList for {user}</div>
    //   <Sort taskList={taskList} setTaskList={setTaskList} />
    //   <button onClick={handleLogout}>Logout</button>
    //   <div className="tasks">
    //     {taskList ? (
    //       taskList.map((row) => {
    //         if (row.status != "deleted") {
    //           return (
    //             <div>
    //               <Task row={row} user={user} setTaskList={setTaskList} />
    //             </div>
    //           );
    //         }
    //       })
    //     ) : (
    //       <div></div>
    //     )}
    //   </div>
    //   <AddTaskForm user={user} setTaskList={setTaskList} />
    // </div>
    <div className="main">
      <div class="container">
        <div class="task-list completed">
          <h2>Completed Tasks</h2>
          {taskList ? (
            taskList.map((row) => {
              if (row.status != "deleted" && row.status === "completed") {
                return (
                  <div>
                    <Task row={row} user={user} setTaskList={setTaskList} />
                  </div>
                );
              }
            })
          ) : (
            <div></div>
          )}
          {/* <div class="card">
          <div class="details">
            <div class="title">Task 2</div>
            <div class="description">This is the description for Task 2.</div>
            <div class="status">Completed</div>
            <div class="due-date">Due: 2023-05-05</div>
          </div>
        </div>
        <div class="card">
          <div class="details">
            <div class="title">Task 3</div>
            <div class="description">This is the description for Task 3.</div>
            <div class="status">Completed</div>
            <div class="due-date">Due: 2023-05-10</div>
          </div>
        </div> */}
        </div>
        <div class="task-list not-completed">
          <h2>Not Completed Tasks</h2>
          {taskList ? (
            taskList.map((row) => {
              if (row.status != "deleted" && row.status === "notCompleted") {
                return (
                  <div>
                    <Task row={row} user={user} setTaskList={setTaskList} />
                  </div>
                );
              }
            })
          ) : (
            <div></div>
          )}
          {/* <div class="card">
          <div class="details">
            <div class="title">Task 4</div>
            <div class="description">This is the description for Task 4.</div>
            <div class="status">Not Completed</div>
            <div class="due-date">Due: 2023-05-10</div>
          </div>
        </div> */}
        </div>
      </div>
      <div>TaskList for {user}</div>
      <AddTaskForm user={user} setTaskList={setTaskList} />
    </div>

    // <div class="container">
    //   <div class="task-list completed">
    //     <h2>Completed Tasks</h2>
    //     <div class="card">
    //       <div class="details">
    //         <div class="title">Task 1</div>
    //         <div class="description">This is the description for Task 1.</div>
    //         <div class="status">Completed</div>
    //         <div class="due-date">Due: 2023-05-01</div>
    //       </div>
    //       <div class="icons">
    //         <div class="icon"></div>
    //         <div class="icon"></div>
    //       </div>
    //     </div>
    //     <div class="card">
    //       <div class="details">
    //         <div class="title">Task 2</div>
    //         <div class="description">This is the description for Task 2.</div>
    //         <div class="status">Completed</div>
    //         <div class="due-date">Due: 2023-05-05</div>
    //       </div>
    //       <div class="icons">
    //         <div class="icon"></div>
    //         <div class="icon"></div>
    //       </div>
    //     </div>
    //     <div class="card">
    //       <div class="details">
    //         <div class="title">Task 3</div>
    //         <div class="description">This is the description for Task </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
