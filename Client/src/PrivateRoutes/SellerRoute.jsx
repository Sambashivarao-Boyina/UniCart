import React from 'react'
import {useSelector} from "react-redux"
import {Navigate,Outlet} from "react-router-dom"

export default function SellerRoute() {
    const {currUser}=useSelector((state)=>state.user);
    return currUser && currUser.type==="Seller" ? <Outlet/> : <Navigate to={"/seller-sign-in"} />;
}
