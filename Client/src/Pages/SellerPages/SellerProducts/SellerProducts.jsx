import React,{useState,useEffect} from 'react'
import {  ToastContainer,Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import SellerProduct from './SellerProduct';

export default function SellerProducts() {
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        getMyProducts();
    },[])

    const getMyProducts= async ()=>{
        try{
            
            const token=localStorage.getItem("access_token");
            const res=await axios.get("http://localhost:8080/seller/myproducts",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            const data=await res.data;
            setProducts(data.products);
        }catch(error){
            console.log(error);
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
        <div className="w-screen py-4 px-auto flex flex-row  items-center  flex-wrap justify-evenly">
            {
                products && products.length ?
                    products.map((product)=>{
                        return (
                            <>
                                <div key={product._id}>
                                    <SellerProduct product={product} setProducts={setProducts}/>
                                </div>

                            </>
                        )
                    })
                :<p>You have no Products</p>
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
