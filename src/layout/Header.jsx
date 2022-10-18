import React from "react";
import "./layout.scss";
import flashscore from "../assets/images/flashscore.png";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import SearchBox from "../components/SearchBox"
import Modal from "../components/Modal"
import {useRef} from "react"


const Header = () => {
  const modalRef = useRef();

  const closeModal = () => {
    modalRef.current.close();
  };

  const openModal = () => {
    modalRef.current.openModal();
    console.log("CLICK");
  };
  return (
    <>
    <div className="navbar">
      <div style={{ flexBasis: "1000px" }}>
        <Link to="/">
          <img src={flashscore} className="logo" />
        </Link>
      </div>
      <div className="search-icon-container" onClick={openModal}>
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
    <Modal ref={modalRef}>
        <SearchBox close={closeModal} />
      </Modal>
      </>
  );
};

export default Header;
