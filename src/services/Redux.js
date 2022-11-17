import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteLeagues: [39, 78, 140, 61, 135, 88],
  favoriteTeams: [],
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
  },
});
export const {
  addNewFavoriteLeague,
  removeFromFavoriteLeagues,
  addNewFavoriteTeam,
  removeFromFavoriteTeams,
} = reduxSlice.actions;
export default reduxSlice.reducer;
