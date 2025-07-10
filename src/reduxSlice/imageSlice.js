import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../url";
import { getHeaders } from "./albumSlice";

export const uploadImage = createAsyncThunk(
  "images/uploadImage",
  async ({formData,token} ) => {
    try {
      const response = await axios.post(`${baseURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
           "Authorization" : `Bearer ${token}`
        },
      });
      return response.data; // Expecting { message, imageUrl, ... }
    } catch (err) {
      console.error(err);
    }
  }
);

// Get images by album
export const getImagesAlbum = createAsyncThunk(
  "images/getImagesAlbum",
  async ({albumId,token}) => {
    try {
      const response = await axios.get(`${baseURL}/images/${albumId}`,{
        headers:getHeaders(token)
    });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const deleteImagesByAlbumId = createAsyncThunk(
  "images/deleteImagesAlbum",
  async ({albumId,token}) => {
    try {
      const response = await axios.delete(
        `${baseURL}/images/delete-by-album/${albumId}`
      ,{
        headers:getHeaders(token)
    });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const deleteImage = createAsyncThunk(
  "images/deleteImage",
  async ({ id,token }) => {
    try {
      const response = await axios.delete(`${baseURL}/image/${id}`,{
        headers:getHeaders(token)
      });
      return { id };
    } catch (error) {
      console.error(error);
    }
  }
);
export const updateImageData = createAsyncThunk(
  "images/updateImage",
  async ({ id, updatedData,token }) => {
    try {
      const response = await axios.post(
        `${baseURL}/image-update/${id}`,
        updatedData,
        {
          headers: getHeaders(token),
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const findImageData = createAsyncThunk(
  "images/viewImage",
  async ({ id,token }) => {
    try {
      const response = await axios.get(`${baseURL}/image/${id}`,{
        headers:getHeaders(token)
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const getLikedImages = createAsyncThunk(
  "images/liked",
  async ({ ownerId,token }) => {
    try {
      const response = await axios.get(`${baseURL}/liked-images/${ownerId}`,{
        headers:getHeaders(token)
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const softDelete = createAsyncThunk(
  "images/softDelete",
  async ({ id, updatedData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/image-update/${id}`,
        updatedData,{
        headers:getHeaders(token)
      }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Soft delete failed"
      );
    }
  }
);
export const recycleBinImages = createAsyncThunk(
  "images/recycleBin",
  async ({ id,token}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/recycle/${id}`,{
        headers:getHeaders(token)
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recycle bin images"
      );
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
        state.images = state.images.filter(
          (image) => image.albumId !== action.meta.arg
        );
      })
      .addCase(deleteImagesByAlbumId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete images";
      })

      // Delete single image
      .addCase(deleteImage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.images = state.images.filter(
          (image) => image._id !== action.meta.arg.id
        );
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete image";
      })
      .addCase(updateImageData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateImageData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedImage = action.payload;
        const index = state.images.findIndex(
          (img) => img._id === updatedImage._id
        );
        if (index !== -1) {
          state.images[index] = updatedImage;
        }
      })
      .addCase(updateImageData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update image";
      })
      .addCase(findImageData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(findImageData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const foundImage = action.payload;
        const index = state.images.findIndex(
          (img) => img._id === foundImage._id
        );
        if (index !== -1) {
          // Update existing image
          state.images[index] = {
            ...state.images[index],
            ...foundImage,
          };
        } else {
          // Image not found, add it
          state.images.push(foundImage);
        }
      })
      .addCase(findImageData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(getLikedImages.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.images = [];
      })
      .addCase(getLikedImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload; // Or use state.likedImages
      })
      .addCase(getLikedImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch liked images";
      })
      .addCase(softDelete.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(softDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedId = action.payload._id || action.payload.id;
        state.images = state.images.filter((img) => img._id !== deletedId);
      })

      .addCase(softDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update image";
      })
      .addCase(recycleBinImages.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.images = [];
      })
      .addCase(recycleBinImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload;
      })
      .addCase(recycleBinImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch recycle bin images";
      });
  },
});

export default imageSlice.reducer;
