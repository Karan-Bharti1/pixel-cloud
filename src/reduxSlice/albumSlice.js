import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../url";
export const fetchAlbumsData=createAsyncThunk("fetchAlbums",async(id)=>{
    
    const response=await axios.get(`${baseURL}/album/${id}`)
 
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
}
})
export default albumSlice.reducer