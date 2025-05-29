import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 export const albumSlice=createSlice({
name:"albums",
initialState:{
    albums:[],
    status:"idle",
    error:null
},
reducers:{},
extraReducers:(builder)=>{
    
}
})
export default albumSlice.reducer