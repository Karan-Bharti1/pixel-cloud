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
export const fetchAlbumsData=createAsyncThunk("fetchAlbums",async({id,token})=>{
    
    const response=await axios.get(`${baseURL}/album/${id}`,{
        headers:getHeaders(token)
    })
 
    return response.data
})
export const postAlbumData=createAsyncThunk( "postAlbums",async({data,token})=>{
    const response=await axios.post(`${baseURL}/album`,data,{
        headers:{
             headers:getHeaders(token)
        }
        
    })
    return response.data
})
export const deleteAlbumData=createAsyncThunk("deleteAlbums",async(id)=>{
    const response=await axios.delete(`${baseURL}/album/${id}`)
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

}
})
export default albumSlice.reducer