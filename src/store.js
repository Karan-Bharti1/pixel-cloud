import { configureStore } from "@reduxjs/toolkit"
import { albumSlice } from "./reduxSlice/albumSlice"
import { imageSlice } from "./reduxSlice/imageSlice"
export default configureStore({
    reducer:{
        albums:albumSlice.reducer,
        images:imageSlice.reducer
    }
})