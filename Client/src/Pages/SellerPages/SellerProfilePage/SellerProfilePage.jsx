import React,{useState,useEffect} from 'react'
import {  Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function SellerProducts() {
    const [seller,setSeller]=useState({});

    useEffect(()=>{
        getSeller();
    },[])

    const getSeller= async ()=>{
        try{
            
            const token=localStorage.getItem("access_token");
            const res=await axios.get("http://localhost:8080/seller",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data=await res.data;
            console.log("hello");
            console.log(data);
            setSeller(data.seller);
        }catch(error){
            toast.error(error?.response?.data?.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
        }
    }
    return (
        <div>
            Profile
        </div>
    )
}
