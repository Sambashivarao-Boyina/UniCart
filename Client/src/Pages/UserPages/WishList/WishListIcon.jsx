import React from 'react'
import {useSelector,useDispatch} from "react-redux";
import {updateUserStart,
    updateUserSuccess,
    updateUserFailure} from "../../../store/user/userSlice";
import axios from 'axios';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function WishListIcon({productId}) {
    
    const {currUser}=useSelector((state)=>state.user);
    const dispatch=useDispatch();

    const handleLiked = async ()=>{
        try{
            const token=localStorage.getItem("access_token");
            const res=await axios.put(`http://localhost:8080/user/like/${productId}`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const data=await res.data;
            if(data.isSuccess){
                dispatch(updateUserSuccess(data.user));
            }else{
                toast.error(data?.message, {
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

    const handleUnLiked = async ()=>{
        try{

            const token=localStorage.getItem("access_token");
            const res=await axios.put(`http://localhost:8080/user/unlike/${productId}`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data=await res.data;
            
            if(data.isSuccess){
                dispatch(updateUserSuccess(data.user));
            }else{
                toast.error(data?.message, {
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
        <div >
            {
                currUser && currUser.type==="User" && currUser.wishlist.includes(productId)?
                    <svg onClick={handleUnLiked} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="red" className="size-8 cursor-pointer">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    
                :   
                    <svg onClick={handleLiked} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>

            }
        </div>
    )
}
