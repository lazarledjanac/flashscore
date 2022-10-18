import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
};

export const reduxSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setId: (state, { payload }) => {
      state.id = payload;
    },
  },
});
export const { setId } = reduxSlice.actions;
export default reduxSlice.reducer;
