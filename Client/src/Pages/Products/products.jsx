import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Product from './Product';
import { Link } from 'react-router-dom';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Products(){
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        getProductsRequest(); 
    },[]);
    
    const getProductsRequest=async ()=>{
        try{
            const res=await axios.get("http://localhost:8080/product/allProducts");
            const data=await res.data;
           
            if(data.isSuccess){
                setProducts(data.products);
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
        <>
            <div className="p-4 flex flex-row  items-center  flex-wrap justify-evenly ">
                {
                    products && products.length ?
                    products.map((item)=><Link to={`/singleProduct/${item._id}` } key={item._id} ><Product product={item}/></Link>)
                    :null
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







