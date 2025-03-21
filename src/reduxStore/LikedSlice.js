import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const loadLikesFromStorage = () => {
  try {
    const storedLikes = localStorage.getItem("likedImages");
    return storedLikes ? JSON.parse(storedLikes) : [];
  } catch (error) {
    console.error("Error loading liked images from localStorage:", error);
    return [];
  }
};

const saveLikesToStorage = (likedImages) => {
  try {
    localStorage.setItem("likedImages", JSON.stringify(likedImages));
  } catch (error) {
    console.error("Error saving liked images to localStorage:", error);
  }
};

const likeSlice = createSlice({
  name: "likes",
  initialState: {
    likedImages: loadLikesFromStorage(),
  },
  reducers: {
    addLike: (state, action) => {
      const image = action.payload;
      const exists = state.likedImages.some((img) => img.id === image.id);
      if (!exists) {
        state.likedImages.push(image);
        saveLikesToStorage(state.likedImages);
        toast.success("✅ You Liked This Image", {
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
    removeLike: (state, action) => {
      const imageId = action.payload;
      state.likedImages = state.likedImages.filter((img) => img.id !== imageId);
      saveLikesToStorage(state.likedImages);
      toast.success("removed!", {
        style: {
          border: "1px solid red",
          padding: "10px",
          color: "red",
          fontWeight: "bold",
          background: "rgb(227, 177, 177)",
        },
      });
    },
  },
});

export const { addLike, removeLike } = likeSlice.actions;
export default likeSlice.reducer;
