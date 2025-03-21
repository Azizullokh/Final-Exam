import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "./LikedSlice";

const store = configureStore({
  reducer: {
    likes: likeReducer,
  },
});

export default store;
