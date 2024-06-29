import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel, Input } from "@material-tailwind/react";
import ImagesContainer from "./ImagesContainer";
import {Button} from "@material-tailwind/react"
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux";
import {setCart} from "../../store/userCart/userCartSlice";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemCartCount from "../UserPages/CartPage/ItemCartCount"
import CommentSection from "./CommentSection";
import { IconButton, Typography } from "@material-tailwind/react";
import { useCopyToClipboard } from "usehooks-ts";
import { CheckIcon, DocumentDuplicateIcon,ShareIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";



export default function SingleProduct(){
    const {productId}=useParams();
    const [product,setProduct]=useState(null);
    const [loading,setLoading]=useState(false);
    const {currUser}=useSelector((state)=>state.user);
    const [count,setCount]=useState(0);
    const token=localStorage.getItem("access_token");
    const {cart}=useSelector((state)=>state.userCart);
    const [isContainInCart,setIsContainInCart]=useState(false);
    const dispatch=useDispatch();

    

    //Copie Link
    const [value, copy] = useCopyToClipboard();
    const [copied, setCopied] = React.useState(false);


    useEffect(()=>{
        getProduct();
    },[]);

    

    const handleCountChange=(event)=>{
        setCount(event.target.value);
        event.target.value=1;
    }

    
    const addToCart=async ()=>{
        try{

            const item={
                product:productId,
                count,
            }
            const res=await axios.put("http://localhost:8080/user/addToCart",{
                item
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const data=await res.data;
            dispatch(setCart(data.cart));
            if(data.isSuccess){
                toast.success(data.message, {
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
            }else{
                toast.error(data.message, {
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

    const removeFromCart=async ()=>{
        try{
            const res=await axios.put(`http://localhost:8080/user/removeFromCart/${productId}`,
            {},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data=await res.data;
            dispatch(setCart(data.cart));

            if(data.isSuccess){
                toast.success(data.message, {
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
            }else{
                toast.error(data.message, {
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
    

    const getProduct=async ()=>{
        try{
            const res=await axios.get(`http://localhost:8080/product/${productId}`);
            const data=await res.data;
            console.log(data);
            setProduct(data.product);
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    function discountCalculator(price,discont){
        return parseFloat((price-price*(discont)/100).toFixed(2));   
    }

    const location=useLocation();
    if(loading){
        return (<p>Loading</p>);
    }
    
    return (
        <div className="bg-teal-50 flex flex-col pb-10   lg:pb-20 min-h-screen lg:pt-10 pt-2">
            <div className=" flex flex-col lg:flex-row  items-center w-scren   ">
                {
                    product && product.images && product.images.length ?
                    <ImagesContainer  images={product.images}/>
                    :null
                }
                {
                    product ?
                    <div className=" flex flex-col flex-1 items-start justify-start gap-2 lg:mr-10 p-4">
                        
                        <p className="font-semibold lg:text-xl text-lg">{product.brand}</p>
                        <p className="font-medium lg:text-3xl text-xl">{product.title}</p>
                        <p className="max-w-xl">{product.description}</p>
                        <p className="max-w-xl">{product.warrantyInformation}</p>
                        <p className="max-w-xl">{product.returnPolicy}</p>
                        <p><span className="text-4xl font-bold">${discountCalculator(product.price,product.discountPercentage)}</span><span className="line-through text-xl ml-1">${product.price}</span></p>
                        <p className="font-medium max-sm:text-xl sm:text-2xl">-{product.discountPercentage}%</p>
                        {
                            currUser===null || currUser.type=="User" ?
                            <>

                                <ItemCartCount cartCount={count} setCartCount={setCount}/>
                                {/* <input type="number" placeholder="enter no of items" value={count} onChange={handleCountChange} className="p-2 border-blue-gray-700 border-2 rounded-md" name="count" /> */}
                                <div className="flex flex-row items-center ">
                                    <Button onClick={addToCart} size="md" variant="gradient" color="blue" className=" w-48 mt-4 text-xl" >Add To Cart</Button>

                                    <div className="flex items-center mt-4 ml-16 gap-x-4 ">
                                        <IconButton
                                            color="blue"
                                            size="lg"
                                            onMouseLeave={() => setCopied(false)}
                                            onClick={() => {
                                                copy(`${window.location.protocol}//${window.location.host}${location.pathname}`);
                                                setCopied(true);
                                            }}
                                        >
                                        {copied ? (
                                            <CheckIcon className="h-5 w-5 font-bold text-white" />
                                        ) : (
                                            <ShareIcon className="h-5 w-5 font-bold text-white" />
                                        )}
                                        </IconButton>
                                    </div>
                                </div>
                                {/* {
                                    cart && cart.findIndex(cartItem => cartItem.product===productId)!==-1 && <Button onClick={removeFromCart} size="md" variant="gradient" color="blue" className="rounded-full w-50 px-auto mt-4 text-xl" >Remove From Cart</Button>
                                } */}
                            </>
                            :null
                        }
                        {
                            currUser && currUser.type==="Seller" && product && product.seller===currUser._id ?
                                <Button className="lg:text-lg" color="blue">Edit Product</Button>
                            :null
                        }
                    </div>
                    :null
                }
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
            </div>
            <CommentSection productId={productId}/>
            
        </div>
    )
}