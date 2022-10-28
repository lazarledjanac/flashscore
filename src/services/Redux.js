import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteLeagues: [39, 78, 140, 61, 135, 88],
  favoriteTeams: [],
  isFavoriteLeague: true,
  isFavoriteTeam: false,
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
        (league) => league.id === payload.id
      );
    },
    addNewFavoriteTeam: (state, { payload }) => {
      state.favoriteTeams.push(payload);
    },
  },
});
export const {
  addNewFavoriteLeague,
  removeFromFavoriteLeagues,
  addNewFavoriteTeam,
} = reduxSlice.actions;
export default reduxSlice.reducer;
