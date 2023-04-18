import React, { useState } from "react";
const TaskTracker = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: 0,
    dueDate: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    console.log(task);
  };
  return (
    <div>
      <h1>Task Tracker</h1>
      <label>
        Title: <input name="title" value={task.title} onChange={handleChange} />
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
        <input name="status" value={task.status} onChange={handleChange} />
      </label>
      <br />
      <label>
        Due Date:
        <input name="dueDate" value={task.dueDate} onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {/* <hr />
      <label>
        Checkbox: <input type="checkbox" name="myCheckbox" />
      </label>
      <hr />
      <p>
        Radio buttons:
        <label>
          <input type="radio" name="myRadio" value="option1" />
          Option 1
        </label>
        <label>
          <input type="radio" name="myRadio" value="option2" />
          Option 2
        </label>
        <label>
          <input type="radio" name="myRadio" value="option3" />
          Option 3
        </label>
      </p> */}
    </div>
  );
};

export default TaskTracker;
