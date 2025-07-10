import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../url";
export const getHeaders = (token) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };
  export const getSingleAlbumData = createAsyncThunk(
  "album/getSingle",
  async ({ albumId,token}) => {
    try {
      const response = await axios.get(`${baseURL}/albums/album/${albumId}`,{
        headers:getHeaders(token)
    });
      return response.data;
    } catch (err) {
      return console.log(err)
    }
  }
);
export const fetchAlbumsData=createAsyncThunk("fetchAlbums",async({id,token})=>{
    
    const response=await axios.get(`${baseURL}/album/${id}`,{
        headers:getHeaders(token)
    })
 
    return response.data
})
export const postAlbumData=createAsyncThunk( "postAlbums",async({data,token})=>{
    const response=await axios.post(`${baseURL}/album`,data,{
        headers:getHeaders(token)
    })
    return response.data
})
export const deleteAlbumData=createAsyncThunk("deleteAlbums",async({id,token})=>{
    const response=await axios.delete(`${baseURL}/album/${id}`,{
      headers:getHeaders(token)
    })
    return response.data
})
export const updateAlbumData=createAsyncThunk("updateAlbum",async({id,albumData,token})=>{
    
    const response=await axios.post(`${baseURL}/album/${id}/update`,albumData,{
     headers:getHeaders(token)
    })
    return response.data
})
 export const albumSlice=createSlice({
name:"albums",
initialState:{
    albums:[],
    status:"idle",
    error:null
},
reducers:{},
extraReducers:(builder)=>{
    builder.addCase(fetchAlbumsData.pending,state=>{
        state.status="loading"
        
    })
    builder.addCase(fetchAlbumsData.fulfilled,(state,action)=>{
        state.status="succeeded"
        state.albums=action.payload
    })
    builder.addCase(fetchAlbumsData.rejected,(state,action)=>{
        state.status="error"
        state.error=action.payload.message
    })
    builder.addCase(postAlbumData.pending,state=>{
        state.status="loading"
    })
    builder.addCase(postAlbumData.fulfilled,(state,action)=>{
        state.status="succeeded"
        state.albums.push(action.payload)
    })
    builder.addCase(postAlbumData.rejected,(state,action)=>{
        state.status="error"
        state.error=action.payload.message
    })
    builder.addCase(deleteAlbumData.pending, (state) => {
    state.status = "loading";
});
builder.addCase(deleteAlbumData.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.albums = state.albums.filter(album => album._id !== action.payload.id);
});
builder.addCase(deleteAlbumData.rejected, (state, action) => {
    state.status = "error";
    state.error = action.error.message;
});
  builder.addCase(updateAlbumData.pending, (state) => {
        state.status = "loading";
      })
      builder.addCase(updateAlbumData.fulfilled, (state, action) => {
  console.log("Updated album:", action.payload);
  state.status = "succeeded";
  const updated = action.payload;
  state.albums = state.albums.map(album =>
    album._id === updated._id ? updated?.updateData : album
  );
});

      builder.addCase(updateAlbumData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
      builder.addCase(getSingleAlbumData.pending, (state) => {
    state.status = "loading";
    state.albums=[]
  })

  
   builder.addCase(getSingleAlbumData.fulfilled, (state, action) => {
  state.status = "succeeded";
  const updatedAlbum = action.payload;
  const index = state.albums.findIndex(album => album._id === updatedAlbum._id);

  if (index !== -1) {
    state.albums[index] = updatedAlbum; 
  } else {
    state.albums.push(updatedAlbum);   
  }

  }) 

  builder.addCase(getSingleAlbumData.rejected, (state, action) => {
    state.status = "error";
    state.error = action.payload?.message || action.error.message;
  })
}
})
export default albumSlice.reducer