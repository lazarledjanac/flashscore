import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

const today = DateTime.now();

const initialState = {
  favoriteLeagues: [39, 78, 140, 61, 135, 88],
  favoriteTeams: [],
  users: [{}],
  loggedUser: {
    id: null,
    username: null,
    password: null,
  },
  loggedIn: false,
  date: today,
};

export const reduxSlice = createSlice({
  name: "redux",
  initialState,
  reducers: {
    addNewFavoriteLeague: (state, { payload }) => {
      state.favoriteLeagues.push(payload);
    },
    removeFromFavoriteLeagues: (state, { payload }) => {
      state.favoriteLeagues = state.favoriteLeagues.filter(
        (league) => league !== payload
      );
    },
    addNewFavoriteTeam: (state, { payload }) => {
      state.favoriteTeams.push(payload);
    },
    removeFromFavoriteTeams: (state, { payload }) => {
      state.favoriteTeams = state.favoriteTeams.filter(
        (team) => team !== payload
      );
    },
    userLogin: (state, { payload }) => {
      state.loggedIn = true;
      state.loggedUser.id = payload.id;
      state.loggedUser.username = payload.username;
      state.loggedUser.password = payload.password;
      state.favoriteTeams = payload.favoriteTeams;
    },
    userLogout: (state) => {
      state.loggedIn = false;
      state.loggedUser.username = null;
      state.loggedUser.password = null;
      state.favoriteLeagues = [39, 78, 140, 61, 135, 88];
      state.favoriteTeams = [];
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setFavoriteLeagues: (state, { payload }) => {
      state.favoriteLeagues = payload;
    },
    setFavoriteTeams: (state, { payload }) => {
      state.favoriteTeams = payload;
    },
    setDate: (state, { payload }) => {
      state.date = payload;
    },
  },
});
export const {
  addNewFavoriteLeague,
  removeFromFavoriteLeagues,
  addNewFavoriteTeam,
  removeFromFavoriteTeams,
  userLogin,
  userLogout,
  setUsers,
  setFavoriteLeagues,
  setFavoriteTeams,
  setDate,
} = reduxSlice.actions;
export default reduxSlice.reducer;
