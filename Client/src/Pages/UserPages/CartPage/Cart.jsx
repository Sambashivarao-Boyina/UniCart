import React from 'react'
import { useState , useEffect } from 'react';
import axios from "axios";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartItem from "./CartItem"
import { Button } from '@material-tailwind/react';
import {useSelector} from "react-redux";

export default function Cart() {

    const [cartItems,setCartItems]=useState([]);
    const {cart}=useSelector((state)=>state.userCart);

    useEffect(()=>{
        getCartItems();
    },[cart])

    const getCartItems = async ()=>{
        try{
            const token=localStorage.getItem("access_token");
            
            const res=await axios.get("http://localhost:8080/user/cart", {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const data=await res.data;
            if(data.isSuccess){
                setCartItems(data.cart);
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

    

    const totalNoOfItems=()=>{
        let count=0;
        for(let i=0;i<cartItems.length;i++){
            count+=cartItems[i].count;
        }
        return count;
    }

    const totalCostOfItems=()=>{
        let cost=0;
        for(let i=0;i<cartItems.length;i++){
            cost+=(cartItems[i].count*cartItems[i].product.actualPrice);
        }
        return cost.toFixed(2);
    }

    return (
        <>
            <div className='flex flex-col items-center px-16 max-md:px-8 max-sm:p-4: py-6 w-full '>
                <p className="text-4xl font-bold">Your Cart Items</p>
                <div className="w-full">
                    {
                        cartItems && cartItems.length ?
                            cartItems.map((item,idx)=>
                                <CartItem item={item} key={idx}/>
                            )
                        :null
                    }
                </div>
                <div className='w-full flex items-center justify-between px-6'>
                    <div>
                        <div>
                            <span className="text-3xl font-bold">Total No of Items: </span>
                            <span className="text-3xl">{totalNoOfItems()}</span>
                        </div>
                        <div>
                            <span className="text-3xl font-bold">Cost of total Items: </span>
                            <span className="text-3xl">${totalCostOfItems()}</span>
                        </div>
                    </div>
                    <div>
                        <Button className='text-2xl'>Place Order</Button>
                    </div>
                </div>
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
