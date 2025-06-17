import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../url";


export const uploadImage = createAsyncThunk(
  "images/uploadImage",
  async (formData) => {
    try {
      const response = await axios.post(`${baseURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Expecting: { message, imageUrl }
    } catch (err) {
     console.log(err)
    }
  }
);

export const imageSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images.push(action.payload); // Store uploaded image info
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default imageSlice.reducer;
