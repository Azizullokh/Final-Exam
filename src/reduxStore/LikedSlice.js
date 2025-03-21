import { createSlice } from "@reduxjs/toolkit";

const loadLikesFromStorage = () => {
  try {
    const storedLikes = localStorage.getItem("likedImages");
    return storedLikes ? JSON.parse(storedLikes) : [];
  } catch (error) {
    console.error(error);
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
    toggleLike: (state, action) => {
      const image = action.payload;
      const index = state.likedImages.findIndex((img) => img.id === image.id);

      if (index === -1) {
        state.likedImages.push(image);
      } else {
        state.likedImages.splice(index, 1);
      }
      saveLikesToStorage(state.likedImages);
    },
  },
});

export const { toggleLike } = likeSlice.actions;
export default likeSlice.reducer;
