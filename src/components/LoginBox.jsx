import React, { useState } from "react";
import { BsXLg } from "react-icons/bs";
import login from "../assets/images/login.png";
import { LoginForm, SignUpForm } from "../components";

const LoginBox = ({ close }) => {
  const [active, setActive] = useState("login");

  return (
    <div className="login-container">
      <img src={login} alt="" />
      <div className="login">
        <BsXLg
          onClick={() => close()}
          style={{ marginTop: "10px", marginRight: "10px", color: "gray" }}
        />
        <br />
        <br />
        <div className="login-buttons">
          <div
            className={active === "login" ? "active" : null}
            onClick={() => setActive("login")}
          >
            Log In
          </div>
          <div
            className={active === "signup" ? "active" : null}
            onClick={() => setActive("signup")}
          >
            Sign Up
          </div>
        </div>
        <hr />
        {active === "login" && (
          <LoginForm setActive={() => setActive("signup")} />
        )}
        {active === "signup" && (
          <SignUpForm setActive={() => setActive("login")} />
        )}
      </div>
    </div>
  );
};

export default LoginBox;
