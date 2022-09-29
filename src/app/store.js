import { configureStore } from "@reduxjs/toolkit";
import { footballApi } from "../services/footballApi";
import idReducer from "../services/Match.js";

export default configureStore({
  reducer: {
    [footballApi.reducerPath]: footballApi.reducer,
    id: idReducer,
  },
});
