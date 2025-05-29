import { configureStore } from "@reduxjs/toolkit"
import { albumSlice } from "./reduxSlice/albumSlice"
export default configureStore({
    reducer:{
        albums:albumSlice.reducer
    }
})