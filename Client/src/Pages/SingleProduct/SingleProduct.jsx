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
import Rating from '@mui/material/Rating';
import WishListIcon from "../UserPages/WishList/WishListIcon";




export default function SingleProduct(){
    const {productId}=useParams();
    const [product,setProduct]=useState(null);
    const [loading,setLoading]=useState(false);
    const {currUser}=useSelector((state)=>state.user);
    const [count,setCount]=useState(1);
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

    
    const addToCart=async ()=>{
        try{

            const item={
                product:productId,
                count,
            }
            const res=await axios.put("/api/user/addToCart",{
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
            const res=await axios.put(`/api/user/removeFromCart/${productId}`,
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
            const res=await axios.get(`/api/product/${productId}`);
            const data=await res.data;
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
        <div className=" flex flex-col pb-10   lg:pb-20 min-h-screen lg:pt-10 pt-2 lg:w-[90%] mx-auto">
            <div className="breadcrumbs text-sm lg:ml-20 ">
                <ul className='lg:text-lg'>
                    <li></li>
                    <li><Link to={"/products"}>Home</Link></li>
                    {product && <li><Link to={`/products/${product._id}`}>{product.title}</Link></li>}
                </ul>
            </div>
            <div className="w-full flex flex-col lg:flex-row  items-center   ">
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
                        <p><span className="text-4xl font-bold">${discountCalculator(product.price,product.discountPercentage)}</span><span className="line-through text-gray-500 text-xl ml-1">${product.price}</span></p>
                        <p className="font-medium text-green-800 max-sm:text-xl sm:text-2xl">{product.discountPercentage}% off</p>

                        {
                            product.reviews && product.reviews.length>0 && <p className="flex items-center"><Rating name="read-only" value={product.averageRating} precision={0.5} readOnly /> <span className="ml-2">over {product.reviews.length} ratings</span> </p>
                        }
                        {
                            product.stock===0 && <p className="text-red-700 font-bold">Out of Stock</p>
                        }
                        {
                            product.stock < 5 &&  product.stock > 0  && <p className="font-bold text-yellow-700"> Only {product.stock} available</p>
                        }
                        {
                            product.stock > 5  && <p className="font-bold text-green-700"> {product.stock} available</p>
                        }


                        {
                            currUser===null || currUser.type=="User" ?
                            <>

                                <ItemCartCount cartCount={count} setCartCount={setCount} maxCount={product.stock}/>
                                {/* <input type="number" placeholder="enter no of items" value={count} onChange={handleCountChange} className="p-2 border-blue-gray-700 border-2 rounded-md" name="count" /> */}
                                <div className="flex flex-row items-center ">
                                    <Button onClick={addToCart} size="md"   className="bg-primary w-48 mt-4 text-xl" >Add To Cart</Button>
                                    <div className="ml-4"><WishListIcon productId={productId}/></div>
                                    <div className="flex items-center mt-4 ml-4 gap-x-4 ">
                                        <IconButton
                                            className="bg-primary"
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