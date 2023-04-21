import React from "react";

export const Task = (props) => {
  return (
    <div className="task-item">
      {props.row.title} {props.row.status} {props.row.description}{" "}
      {props.row.dueDate}
    </div>
  );
};
