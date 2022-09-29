import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
};

export const idSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setId: (state, { payload }) => {
      state.id = payload;
    },
  },
});
export const { setId } = idSlice.actions;
export default idSlice.reducer;
