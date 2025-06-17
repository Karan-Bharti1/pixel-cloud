import { createSlice } from "@reduxjs/toolkit";

const imageSlice=createSlice({
    name:"PixelImages",
    initialState:{
    images:[],
    status:"idle",
    error:null
},
reducers:{},
})
export default imageSlice.reducer