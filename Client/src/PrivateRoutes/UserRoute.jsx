import React from 'react'
import {useSelector} from "react-redux"
import {Navigate,Outlet} from "react-router-dom"

export default function UserRoute() {
    const {currUser}=useSelector((state)=>state.user);
    if(currUser && currUser.type==="User"){
        return  <Outlet/>
    } else {
        <Navigate to={"/sign-in"} />
    }
}
