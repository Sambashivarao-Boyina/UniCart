import React from 'react'
import {useSelector} from "react-redux"
import {Navigate,Outlet} from "react-router-dom"

export default function UserRoute() {
    const {currUser}=useSelector((state)=>state.user);
    return currUser && currUser.type==="User" ? <Outlet/> : <Navigate to={"/sign-in"} />;
}
