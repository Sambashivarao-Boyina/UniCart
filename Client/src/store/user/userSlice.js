import { createSlice } from "@reduxjs/toolkit";

let initialState={
    currUser:null,
    loading:false,
    error:false
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signSuccess:(state,action)=>{
            state.currUser=action.payload;
            state.loading=false;
            state.error=false;
        },
        signInFaliure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signOut:(state)=>{
            state.currUser=null;
            state.loading=false;
            state.error=false;
        }
    }
})

export const {
    signInFaliure,
    signSuccess,
    signInStart,
    signOut
}=userSlice.actions;

export default userSlice.reducer;