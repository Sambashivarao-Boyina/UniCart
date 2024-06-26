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
        },
        updateUserStart:(state)=>{
            state.loading=true
        },
        updateUserSuccess:(state,action)=>{
            state.currUser=action.payload,
            state.loading=false,
            state.error=false
        },
        updateUserFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        }
    }
})

export const {
    signInFaliure,
    signSuccess,
    signInStart,
    signOut,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
}=userSlice.actions;

export default userSlice.reducer;