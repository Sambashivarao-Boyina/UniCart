import { createSlice } from "@reduxjs/toolkit";

let initialState={
    cart:[]
}

const userCartSlice=createSlice({
    name:"userCart",
    initialState,
    reducers:{
        setCart:(state,action)=>{
            state.cart=action.payload
        },
        clearCart:(state)=>{
            state.cart=[]
        }
    }
})

export const {
    setCart,
    clearCart
}=userCartSlice.actions;

export default userCartSlice.reducer;