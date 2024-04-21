import React from 'react'
import {useSelector} from "react-redux"
import {Navigate,Outlet} from "react-router-dom"

export default function UserSignInRoute() {
    const {currUser}=useSelector((state)=>state.user);
    return currUser ? <Outlet/> : <Navigate to={"/sign-in"} />;
}

    
