import React, { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "./Task";
import { AddTaskForm } from "./AddTaskForm";
import { EditTaskForm } from "./EditTaskForm";

export const TaskList = (props) => {
  const [user, setUser] = useState();
  const [taskList, setTaskList] = useState();
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
  return (
    <div>
      <div>TaskList for {user}</div>
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
