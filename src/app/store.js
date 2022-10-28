import { configureStore } from "@reduxjs/toolkit";
import { footballApi } from "../services/footballApi";
import reduxReducer from "../services/Redux";

export default configureStore({
  reducer: {
    [footballApi.reducerPath]: footballApi.reducer,
    redux: reduxReducer,
  },
});
