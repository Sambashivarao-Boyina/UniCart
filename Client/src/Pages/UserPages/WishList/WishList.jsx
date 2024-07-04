import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WishListItem from './WishListItem';

export default function WishList() {
    const [wishlist,setWishlist]=useState([]);

    useEffect(()=>{
        getWishListItems();
    },[])


    const getWishListItems = async ()=>{

        const token=localStorage.getItem("access_token");
        const res=await axios.get("http://localhost:8080/user/wishlist",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        const data=await res.data;
        setWishlist(data.wishlist);

    }

    

    return (
        <div className='w-screen py-4  flex flex-row items-center  flex-wrap justify-evenly'>
            {
                wishlist && wishlist.length ?
                    wishlist.map((wishlistItem)=><div className='' key={wishlistItem._id}><WishListItem wishlistItem={wishlistItem}/></div>)
                :<p>You have Empty Wishlist</p>
            }
        </div>
    )
}
