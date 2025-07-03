import { configureStore } from "@reduxjs/toolkit"
import { albumSlice } from "./reduxSlice/albumSlice"
import { imageSlice } from "./reduxSlice/imageSlice"
import { commentSlice } from "./reduxSlice/commentSlice"
export default configureStore({
    reducer:{
        albums:albumSlice.reducer,
        images:imageSlice.reducer,
        comments:commentSlice.reducer
    }
})