import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../url";

// Upload image thunk
export const uploadImage = createAsyncThunk(
  "images/uploadImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Expecting { message, imageUrl, ... }
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response?.data?.message || "Upload failed");
    }
  }
);

// Get images by album
export const getImagesAlbum = createAsyncThunk(
  "images/getImagesAlbum",
  async (albumId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/images/${albumId}`);
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch images");
    }
  }
);

// Slice
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

      // Upload image
      .addCase(uploadImage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images.push(action.payload); // Append uploaded image
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get images of album
      .addCase(getImagesAlbum.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getImagesAlbum.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload; // Replace with fetched images
      })
      .addCase(getImagesAlbum.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default imageSlice.reducer;
