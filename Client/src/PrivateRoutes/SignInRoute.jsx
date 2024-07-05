import React from 'react'
import {useSelector} from "react-redux"
import {Navigate,Outlet} from "react-router-dom"

export default function SignInRoute() {
    const {currUser}=useSelector((state)=>state.user);
    if(currUser){
        return <Outlet/>
    }else{
        return <Navigate to={"/sign-in"} />
    }

}

    
