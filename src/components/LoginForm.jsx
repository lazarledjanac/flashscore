import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userLogin,
  setUsers,
  setFavoriteLeagues,
  setFavoriteTeams,
} from "../services/Redux";
import { useGetAllUsers } from "../hooks/users";

const LoginForm = ({ setActive, close }) => {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { users, favoriteTeams } = useSelector((store) => store.redux);
  let ids = [];

  dispatch(setUsers(useGetAllUsers()));
  console.log(users);

  for (var id in users) {
    ids.push(id);
  }
  console.log(ids);
  const logIn = () => {
    const user = ids.find(
      (id) => usernameRef.current.value == users[id].username
    );
    console.log(users[user].password);
    if (!user) {
      console.log(
        "There is no user with username " + usernameRef.current.value
      );
      return;
    }
    if (passwordRef.current.value != users[user].password) {
      console.log("Wrong password");
      return;
    }
    dispatch(
      userLogin({
        id: user,
        username: users[user].username,
        password: users[user].password,
        favoriteTeams: !favoriteTeams ? [] : favoriteTeams,
      })
    );
    dispatch(setFavoriteLeagues(users[user].favoriteLeagues));
    dispatch(
      setFavoriteTeams(
        users[user].favoriteTeams == null ? [] : users[user].favoriteTeams
      )
    );
    console.log("Login successful");
    close();
  };
  return (
    <div className="form">
      <input type="text" placeholder="Username" ref={usernameRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button onClick={logIn}>LOG IN</button>
      <small>
        Don't have account? <span onClick={setActive}>Sign up here!</span>
      </small>
    </div>
  );
};

export default LoginForm;
