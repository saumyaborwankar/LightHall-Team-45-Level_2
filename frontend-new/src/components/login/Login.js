import React, { useState } from "react";
import axios from "axios";
// import PropTypes from 'prop-types';

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async () => {
    let response = await axios.post("http://localhost:9002/login", {
      name: username,
      password: password,
    });
    if (response.status === 200) {
      props.setIsLoggedIn(true);
      console.log("logged in");
    } else {
      console.log("wrong pass");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username, password);
    loginUser();
    // const token = await loginUser({
    //   username,
    //   password
    // });
    // setToken(token);
  };

  return (
    <div className="auth-form-container">
      <h1>Please Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            id="username"
            type="username"
            name="username"
          />
        </label>
        <label>
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**********"
            id="password"
            type="password"
            name="password"
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };
