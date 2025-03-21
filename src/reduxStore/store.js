import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "./LikedSlice";
import downloadReducer from "./downloadSlice"

const store = configureStore({
  reducer: {
    likes: likeReducer,
    download: downloadReducer,
  },
});

export default store;
