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
            toast.error(error.response.data.message, {
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
            toast.error(error.response.data.message, {
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


    if(loading){
        return (<p>Loading</p>);
    }
    
    return (
        <div className="flex flex-col items-center w-screen p-4 bg-teal-50 h-screen">
            {
                product && product.images && product.images.length ?
                <ImagesContainer images={product.images}/>
                :null
            }
            {
                product ?
                <div className="sm:w-3/4 w-[97%] flex flex-col items-start justify-start gap-2">
                    <p className="font-medium max-sm:text-xl text-2xl">{product.title}</p>
                    <p className="">{product.description}</p>
                    <p><span className="text-4xl font-bold">${discountCalculator(product.price,product.discountPercentage)}</span><span className="line-through text-xl ml-1">${product.price}</span></p>
                    <p className="font-medium max-sm:text-xl sm:text-2xl">-{product.discountPercentage}%</p>
                    <input type="number" placeholder="enter no of items" value={count} onChange={handleCountChange} className="p-2 border-blue-gray-700 border-2 rounded-md" name="count" />
                    <Button onClick={addToCart} size="md" variant="gradient" color="blue" className="rounded-full w-48 mt-4 text-xl" >Add To Cart</Button>
                    {
                        cart.findIndex(cartItem => cartItem.product===productId)!==-1 && <Button onClick={removeFromCart} size="md" variant="gradient" color="blue" className="rounded-full w-48 mt-4 text-xl" >Remove From Cart</Button>
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
    )
}