import React, { lazy } from 'react'
import { useState , useEffect } from 'react';
import axios from "axios";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartItem from "./CartItem"
import {useSelector} from "react-redux";
import {Typography} from "@material-tailwind/react"
import "./PlaceOrderDialog.css";
import {Link} from "react-router-dom";

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Spinner
} from "@material-tailwind/react";
import PlaceOrderDialog from './PlaceOrderDialog';
import { FastField } from 'formik';


export default function Cart() {

    const [cartItems,setCartItems]=useState([]);
    const {cart}=useSelector((state)=>state.userCart);

    //Place Order Confirm
    const [orderDialog, setOrderDialog] = React.useState(false);
    const handleOrderDialog = () => setOrderDialog(!orderDialog);
    const [loading,setLoading]=useState(false);
    const [placingOrder,setPlacingOrder]=useState(false);

    useEffect(()=>{
        getCartItems();
    },[cart])

    const getCartItems = async ()=>{
        try{
            setLoading(true);
            const token=localStorage.getItem("access_token");
            const res=await axios.get("http://localhost:8080/user/cart", {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const data=await res.data;
            if(data.isSuccess){
                setLoading(false);
                setCartItems(data.cart);
            }else{
                setLoading(false);
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
            setLoading(false);
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

    if(placingOrder){
        return (
            <div className='w-full h-screen flex items-center justify-center '>
                <div className="loader flex flex-col items-center ">
                    <p className='text-xl lg:text-2xl font-semibold'>Placing your order</p>
                    <div class="truckWrapper">
                        <div className="truckBody">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 198 93"
                            className="trucksvg"
                        >
                            <path
                            strokeWidth="3"
                            stroke="#282828"
                            fill="#F83D3D"
                            d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
                            ></path>
                            <path
                            strokeWidth="3"
                            stroke="#282828"
                            fill="#7D7C7C"
                            d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
                            ></path>
                            <path
                            strokeWidth="2"
                            stroke="#282828"
                            fill="#282828"
                            d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
                            ></path>
                            <rect
                            strokeWidth="2"
                            stroke="#282828"
                            fill="#FFFCAB"
                            rx="1"
                            height="7"
                            width="5"
                            y="63"
                            x="187"
                            ></rect>
                            <rect
                            strokeWidth="2"
                            stroke="#282828"
                            fill="#282828"
                            rx="1"
                            height="11"
                            width="4"
                            y="81"
                            x="193"
                            ></rect>
                            <rect
                            strokeWidth="3"
                            stroke="#282828"
                            fill="#DFDFDF"
                            rx="2.5"
                            height="90"
                            width="121"
                            y="1.5"
                            x="6.5"
                            ></rect>
                            <rect
                            strokeWidth="2"
                            stroke="#282828"
                            fill="#DFDFDF"
                            rx="2"
                            height="4"
                            width="6"
                            y="84"
                            x="1"
                            ></rect>
                        </svg>
                        </div>
                        <div className="truckTires">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 30 30"
                            className="tiresvg"
                        >
                            <circle
                            strokeWidth="3"
                            stroke="#282828"
                            fill="#282828"
                            r="13.5"
                            cy="15"
                            cx="15"
                            ></circle>
                            <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 30 30"
                            className="tiresvg"
                        >
                            <circle
                            strokeWidth="3"
                            stroke="#282828"
                            fill="#282828"
                            r="13.5"
                            cy="15"
                            cx="15"
                            ></circle>
                            <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                        </svg>
                        </div>
                        <div class="road"></div>

                        <svg
                        xml:space="preserve"
                        viewBox="0 0 453.459 453.459"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xmlns="http://www.w3.org/2000/svg"
                        id="Capa_1"
                        version="1.1"
                        fill="#000000"
                        className="lampPost"
                        >
                        <path
                            d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
                    c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
                    c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
                    c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
                    h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
                    v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
                    V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
                    M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
                    h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
                        ></path>
                        </svg>
                    </div>
                </div>

            </div>
        )
    }

    if(loading){
        let arr=[1,2,3,4,4,5,6,7,8];
        return (
            <div className="px-4 sm:px-4 md:px-6 lg:px-8 max-w-[900px] md:mx-auto mt-8 flex flex-row gap-4 items-center mx-2  flex-wrap justify-evenly">
                {
                    arr.map((item,idx)=>{
                        return (
                            <div key={idx} className="w-full min-w-[315px] flex animate-pulse flex-row items-center gap-8">
                                <div className="grid h-20 w-40 place-items-center rounded-lg bg-gray-300">
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
                                <div className="flex-1">
                                    <Typography
                                    as="div"
                                    variant="h1"
                                    className="mb-4 h-3 w-full rounded-full bg-gray-300"
                                    >
                                    &nbsp;
                                    </Typography>
                                    <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                    >
                                    &nbsp;
                                    </Typography>
                                    <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                    >
                                    &nbsp;
                                    </Typography>
                                    <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-full rounded-full bg-gray-300"
                                    >
                                    &nbsp;
                                    </Typography>
                                    <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-full rounded-full bg-gray-300"
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
            <div className="breadcrumbs text-sm lg:ml-20 ">
                <ul className='lg:text-lg'>
                    <li></li>
                    <li><Link to={"/products"}>Home</Link></li>
                    <li><Link to={"/cart"}>Cart</Link></li>
                </ul>
            </div>
            <div className='flex flex-col items-center px-3 sm:px-4 md:px-6 lg:px-8 max-w-[900px] mx-auto  py-6 w-full '>
                
                <p className="text-3xl self-start sm:text-4xl font-bold">Shopping Cart</p>
                <p className="text-lg self-start sm:text-xl font-bold">you have {cart.length} items in your cart</p>
                <div className="w-full flex flex-col items-center  gap-4 mx-auto">
                    {
                        cartItems && cartItems.length ?
                            cartItems.map((item,idx)=>
                                <div key={item.product._id} className='w-full'><CartItem item={item} /></div>
                            )
                        :null
                    }
                </div>
                <br />
                <hr className="border-t-2 w-full mb-3 border-blue-gray-500" />
                <br />
                <div className='w-full flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:text-3xl text-xl flex-wrap justify-between  px-1 sm:px-6'>
                    
                    <div>
                        <div>
                            <span className=" font-bold">Total No of Items: </span>
                            <span className="">{totalNoOfItems()}</span>
                        </div>
                        <div>
                            <span className=" font-bold">Cost of total Items: </span>
                            <span className="">${totalCostOfItems()}</span>
                        </div>
                    </div>
                    <div>
                        <Button onClick={handleOrderDialog} disabled={cart.length===0} className='sm:text-2xl bg-primary'>Place Order</Button>
                    </div>
                </div>
            </div>
            <PlaceOrderDialog  orderDialog={orderDialog} handleOrderDialog={handleOrderDialog} totalCostOfItems={totalCostOfItems()} setPlacingOrder={setPlacingOrder}/>
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
