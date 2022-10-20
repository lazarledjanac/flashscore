import React, { useRef } from "react";
import "./layout.scss";
import flashscore from "../assets/images/flashscore.png";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { SearchBox, Modal, LoginBox } from "../components";

const Header = () => {
  const searchRef = useRef();
  const loginRef = useRef();

  const closeSearchModal = () => {
    searchRef.current.close();
  };
  const closeLoginModal = () => {
    loginRef.current.close();
  };

  const openSearchModal = () => {
    searchRef.current.openModal();
  };
  const openLoginModal = () => {
    loginRef.current.openModal();
  };
  return (
    <>
      <div className="navbar">
        <div style={{ flexBasis: "1000px" }}>
          <Link to="/">
            <img src={flashscore} className="logo" />
          </Link>
        </div>
        <div className="search-icon-container" onClick={openSearchModal}>
          <AiOutlineSearch className="search" />
        </div>
        <div className="login-icon-container" onClick={openLoginModal}>
          <BsPerson style={{ padding: "5px" }} />
          LOGIN
        </div>
        <div className="search-icon-container">
          <GiHamburgerMenu className="search" />
        </div>
      </div>
      <Modal ref={searchRef}>
        <SearchBox close={closeSearchModal} />
      </Modal>
      <Modal ref={loginRef}>
        <LoginBox close={closeLoginModal} />
      </Modal>
    </>
  );
};

export default Header;
