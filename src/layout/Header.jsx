import React, { useRef } from "react";
import "./layout.scss";
import flashscore from "../assets/images/flashscore.png";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { SearchBox, Modal, LoginBox } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../services/Redux";
import { BsXLg } from "react-icons/bs";

const Header = () => {
  const dispatch = useDispatch();
  const { loggedIn, loggedUser } = useSelector((store) => store.redux);

  const searchRef = useRef();
  const loginRef = useRef();
  const logoutRef = useRef();

  const closeSearchModal = () => {
    searchRef.current.close();
  };
  const closeLoginModal = () => {
    loginRef.current.close();
  };
  const closeLogoutModal = () => {
    logoutRef.current.close();
  };

  const openSearchModal = () => {
    searchRef.current.openModal();
  };
  const openLoginModal = () => {
    loginRef.current.openModal();
  };
  const openLogoutModal = () => {
    logoutRef.current.openModal();
  };
  return (
    <>
      <div className="navbar">
        <div className="logo-container">
          <Link to="/">
            <img src={flashscore} className="logo" />
          </Link>
        </div>
        <div className="search-icon-container" onClick={openSearchModal}>
          <b>
            <AiOutlineSearch className="search" />
          </b>
        </div>
        <div
          className="login-icon-container"
          onClick={loggedIn ? openLogoutModal : openLoginModal}
        >
          <BsPerson style={{ padding: "5px" }} />
          {loggedIn ? (
            <>
              <b>{loggedUser.username}</b>
              <button>Log out</button>
            </>
          ) : (
            "LOGIN"
          )}
        </div>
        <div className="search-icon-container">
          <b>
            <GiHamburgerMenu className="search" />
          </b>
        </div>
      </div>
      <Modal ref={searchRef}>
        <SearchBox close={closeSearchModal} />
      </Modal>
      <Modal ref={loginRef}>
        <LoginBox close={closeLoginModal} />
      </Modal>
      <Modal ref={logoutRef}>
        <div className="form">
          <h1>Are you sure you want to log out?</h1>
          <div style={{ display: "flex", width: "80%", gap: "20px" }}>
            <button
              onClick={() => {
                dispatch(userLogout());
                closeLogoutModal();
              }}
            >
              Yes
            </button>
            <button onClick={() => closeLogoutModal()}>No</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
