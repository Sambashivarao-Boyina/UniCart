import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";

export const store=configureStore({
    reducer:productsSlice,
})