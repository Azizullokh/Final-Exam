import { createSlice } from "@reduxjs/toolkit";
const loadLikesFromStorage = () => {
  const storedLikes = localStorage.getItem("likedImages");
  return storedLikes ? JSON.parse(storedLikes) : [];
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
      localStorage.setItem("likedImages", JSON.stringify(state.likedImages));
    },
  },
});

export const { toggleLike } = likeSlice.actions;
export default likeSlice.reducer;
