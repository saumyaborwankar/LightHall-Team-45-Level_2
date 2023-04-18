import React, { useState } from "react";
import TaskTracker from "./TaskTracker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";

const Homepage = () => {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <div>Homepage</div>
      {isLoggedIn ? <TaskTracker user={"Saumya"} /> : <Login />}
    </div>
  );
};
export default Homepage;
