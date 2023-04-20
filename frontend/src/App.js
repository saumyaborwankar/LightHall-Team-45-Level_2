import logo from "./logo.svg";
import "./App.css";
import TaskTracker from "./TaskTracker";
import Homepage from "./Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import TaskForm from "./components/taskForm";

function App() {
  const [user, setUser] = useState("sss");
  return (
    <div className="App">
      {/* <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Homepage /> : <Login />}
          </Route>
        </Switch>
      </Router> */}
      {/* <Homepage /> */}
      <TaskTracker user="Saumya" />
      {/* <TaskForm /> */}
    </div>
  );
}

export default App;
