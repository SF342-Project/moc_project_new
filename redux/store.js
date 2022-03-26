import { configureStore } from "@reduxjs/toolkit";
import PriceReducer from "./users/PriceSlice";
import UserReducer from "./users/UserSlice"

export const store = configureStore({
    reducer: {
        users: UserReducer,
        prices: PriceReducer
    }
})