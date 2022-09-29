import React from "react";
import "./layout.scss";
import flashscore from "../assets/images/flashscore.png";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar">
      <div style={{ flexBasis: "1000px" }}>
        <Link to="/">
          <img src={flashscore} className="logo" />
        </Link>
      </div>
      <div className="search-icon-container">
        <AiOutlineSearch className="search" />
      </div>
      <div className="login-icon-container">
        <BsPerson style={{ padding: "5px" }} />
        LOGIN
      </div>
      <div className="search-icon-container">
        <GiHamburgerMenu className="search" />
      </div>
    </div>
  );
};

export default Header;
