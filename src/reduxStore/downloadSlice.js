import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  images: JSON.parse(localStorage.getItem("downloadedImages")) || [],
};

const downloadSlice = createSlice({
  name: "download",
  initialState,
  reducers: {
    addImage: (state, action) => {
      if (!state.images.some((img) => img.id === action.payload.id)) {
        state.images.push(action.payload);
        localStorage.setItem("downloadedImages", JSON.stringify(state.images));
        toast.success("added to download!", {
          style: {
            border: "1px solid #4CAF50",
            padding: "10px",
            color: "#4CAF50",
            fontWeight: "bold",
            background: "#f0fff0",
          },
        });
      }
    },
    removeImage: (state, action) => {
      state.images = state.images.filter((img) => img.id !== action.payload);
      localStorage.setItem("downloadedImages", JSON.stringify(state.images));
      toast.success("removed from download!", {
        style: {
          border: "1px solid rgb(227, 61, 61)",
          padding: "10px",
          color: "red",
          fontWeight: "bold",
          background: "#f0fff0",
        },
      });
    },
  },
});

export const { addImage, removeImage } = downloadSlice.actions;
export default downloadSlice.reducer;
