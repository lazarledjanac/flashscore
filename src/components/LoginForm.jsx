import React from "react";

const LoginForm = ({ setActive }) => {
  return (
    <div className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>LOG IN</button>
      <small>
        Don't have account? <span onClick={setActive}>Sign up here!</span>
      </small>
    </div>
  );
};

export default LoginForm;
