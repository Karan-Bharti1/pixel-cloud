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
  async (albumId) => {
    try {
      const response = await axios.get(`${baseURL}/images/${albumId}`);
      return response.data;
    } catch (err) {
      console.error(err);
     
    }
  }
);
export const deleteImagesByAlbumId=createAsyncThunk("images/deleteImagesAlbum",async(albumId)=>{
  try {
    const response=await axios.delete(`${baseURL}/images/delete-by-album/${albumId}`)
    return response.data
  } catch (error) {
    console.error(error);
  }
})
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
      state.images.push(action.payload); // Append the uploaded image
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
      state.error = action.payload || "Failed to fetch images";
    })

    // Delete images by albumId
    .addCase(deleteImagesByAlbumId.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(deleteImagesByAlbumId.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Assuming delete returns a success message, not updated images
      state.images = state.images.filter(image => image.albumId !== action.meta.arg);
    })
    .addCase(deleteImagesByAlbumId.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Failed to delete images";
    });
}
})

export default imageSlice.reducer;
