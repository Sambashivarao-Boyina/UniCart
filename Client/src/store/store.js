import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import userCartSlice from "./userCart/userCartSlice";

export const store=configureStore({
    reducer:{
        user:userReducer,
        userCart:userCartSlice,
    }
})


