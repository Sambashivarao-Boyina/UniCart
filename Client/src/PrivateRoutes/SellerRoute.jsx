import React from 'react'
import {useSelector} from "react-redux"
import {Navigate,Outlet} from "react-router-dom"

export default function SellerRoute() {
    const {currUser}=useSelector((state)=>state.user);
    if(currUser){
        if(currUser && currUser.type==="Seller"){
            return <Outlet/> 
        }else{
            return <Navigate to={"/seller/sign-in"} />
        }
    }
}
