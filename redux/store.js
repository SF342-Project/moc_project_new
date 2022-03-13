import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./users/UserSlice"

export const store = configureStore({
    reducer: {
        users: UserReducer
    }
})