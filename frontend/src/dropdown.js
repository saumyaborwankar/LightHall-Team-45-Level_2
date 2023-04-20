import Dropdown from "react-bootstrap/Dropdown";

function BasicExample(props) {
  const handleSubmit = (e) => {
    //   // let sortBy="status";
    console.log(props.taskList);
    let sortedTaskList;
    // if (e.target.value === "title") {
    //   sortedTaskList = props.taskList.sort((a, b) => {
    //     b.title - a.title;
    //   });
    // } else if (e.target.text === "Description") {
    //   sortedTaskList = props.taskList.sort((a, b) => {
    //     b.description - a.description;
    //   });
    // } else if (e.target.text === "Status") {
    //   sortedTaskList = props.taskList.sort((a, b) => {
    //     b.status - a.status;
    //   });
    // } else if (e.target.text === "Due Date") {
    //   sortedTaskList = props.taskList.sort((a, b) => {
    //     b.dueDate - a.dueDate;
    //   });
    // }
    // props.stateChanger(sortedTaskList);

    console.log(e.target.text);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort By
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleSubmit}>Title</Dropdown.Item>
        <Dropdown.Item onClick={handleSubmit}>Description</Dropdown.Item>
        <Dropdown.Item onClick={handleSubmit}>Due Date</Dropdown.Item>
        <Dropdown.Item onClick={handleSubmit}>Status</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;
