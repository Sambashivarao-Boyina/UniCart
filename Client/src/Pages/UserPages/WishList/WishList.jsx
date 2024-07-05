import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WishListItem from './WishListItem';
import {Typography} from "@material-tailwind/react"
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WishList() {
    const [wishlist,setWishlist]=useState([]);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        getWishListItems();
    },[])


    const getWishListItems = async ()=>{

        try{
            setLoading(true);
            const token=localStorage.getItem("access_token");
            const res=await axios.get("http://localhost:8080/user/wishlist",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const data=await res.data;
            setWishlist(data.wishlist);
            setLoading(false);
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
            setLoading(false);  
        }

    }

    if(loading){
        let arr=[1,2,3,4,4,5,6,7,8,9,10];
        return (
            <div className="w-screen py-4 px-auto flex flex-row gap-4 items-center  flex-wrap justify-evenly">
                {
                    arr.map((item)=>{
                        return (
                            <div className="flex animate-pulse flex-col items-center gap-8">
                                <div className="grid h-40 w-40 place-items-center rounded-lg bg-gray-300">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-12 w-12 text-gray-500"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                    </svg>
                                </div>
                                <div className="w-max">
                                    <Typography
                                    as="div"
                                    variant="h1"
                                    className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                                    >
                                    &nbsp;
                                    </Typography>
                                    <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                    >
                                    &nbsp;
                                    </Typography>
                                    <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                    >
                                    &nbsp;
                                    </Typography>
                                    <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                    >
                                    &nbsp;
                                    </Typography>
                                    <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                    >
                                    &nbsp;
                                    </Typography>
                                    
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    

    return (
        <>
            <div className='w-screen py-4  flex flex-row items-center  flex-wrap justify-evenly'>
                {
                    wishlist && wishlist.length ?
                        wishlist.map((wishlistItem)=><div className='' key={wishlistItem._id}><WishListItem wishlistItem={wishlistItem}/></div>)
                    :<p>You have Empty Wishlist</p>
                }

                
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />
        </>
    )
}
