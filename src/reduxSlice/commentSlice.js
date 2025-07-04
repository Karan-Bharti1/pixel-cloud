import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../url";
export const postCommentData=createAsyncThunk("comments/post",async({data})=>{
const response=await axios.post(`${baseURL}/image/comment`,data,{
    headers:{
         'Content-Type': 'application/json'
    }
})
return response.data
})
export const getCommentsData = createAsyncThunk("comments/get", async ({ id }) => {
  const response = await axios.get(`${baseURL}/image/comment/${id}`);
  return response.data; 
});
 export const commentSlice=createSlice({
    name:"comments",
    initialState:{
        comments:[],
        status:"idle",
    error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(postCommentData.pending,state=>{
            state.status="loading"
        })
        builder.addCase(postCommentData.fulfilled,(state,action)=>{
            state.status="succeeded",
            state.comments.push(action.payload)
        })
        builder.addCase(postCommentData.rejected,(state,action)=>{
            state.status="error",
state.error=action.payload
        })
            builder.addCase(getCommentsData.pending, (state) => {
        state.status = "loading";
         state.comments = [];
      })
      builder.addCase(getCommentsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload; 
      })
      builder.addCase(getCommentsData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
    }
   
})
export default commentSlice.reducer