import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Product from './Product';
import { Link } from 'react-router-dom';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    Typography, 
} from '@material-tailwind/react';
import {
    MagnifyingGlassIcon
} from "@heroicons/react/24/solid"

import Filters from './Filters';




export default function Products(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);

    const [dataBaseProducts,setDatabaseProducts]=useState([]);

    useEffect(()=>{
        setProducts(dataBaseProducts);
    },[dataBaseProducts])

    //Drawer states
    const [open, setOpen] = React.useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const [list,setList]=useState(false);
    const handleList = (value) => {
        setList(list === value ? 0 : value);
    };


    //setPrice Filters
    const [lowestPrice,setLowestPrice]=useState(0);
    const [highestPrice,setHighestPrice]=useState(0);
    
    useEffect(()=>{
        getMinPrice();
        getMaxPrice();
    },[dataBaseProducts]);

    const getMinPrice=()=>{
        if(products && products.length>0){
            let min=products[0].actualPrice;
            for(let i=0;i<products.length;i++){
                min=Math.min(min,products[i].actualPrice);
            }
            setLowestPrice(min);
        }
    }

    const getMaxPrice=()=>{
        if(products && products.length>0){
            let max=products[0].actualPrice;
            for(let i=0;i<products.length;i++){
                max=Math.max(max,products[i].actualPrice);
            }
            setHighestPrice(max);
        }
    }


    //searchValue;
    const [search,setSearch]=useState("");

    function normalizeString(str) {
        str=str.replace("-","");
        return str.replace(/\s+/g, '').toLowerCase();
    }
    

    const handleSearchBtn=()=>{
        if(search.length>0){
            let set=new Set();
            for(let i=0;i<dataBaseProducts.length;i++){
                if(normalizeString(dataBaseProducts[i].title).includes(normalizeString(search))){
                    set.add(dataBaseProducts[i]);
                }
            }
            for(let i=0;i<dataBaseProducts.length;i++){
                if(normalizeString(dataBaseProducts[i].category).includes(normalizeString(search))){
                    set.add(dataBaseProducts[i]);
                }
            }
            setProducts([...set]);
            setSearch("");
        }else{
            setProducts(dataBaseProducts);
        }

    }



    useEffect(()=>{
        getProductsRequest(); 
    },[]);
    
    const getProductsRequest=async ()=>{
        try{    
            setLoading(true);
            const res=await axios.get("/api/product/allProducts");
            const data=await res.data;
           
            if(data.isSuccess){
                setDatabaseProducts(data.products);
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
            <div className="w-screen py-4 px-auto grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2  gap-2 lg:gap-6  items-center  flex-wrap justify-evenly">
                {
                    arr.map((item,idx)=>{
                        return (
                            <div key={idx} className="flex animate-pulse flex-col items-center gap-8">
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
            <div className='w-full flex items-center mt-2'>
                <div className="hidden sm:block  breadcrumbs text-sm lg:ml-20 lg:-mb-4 ">
                    <ul className='lg:text-lg'>
                        <li></li>
                        <li><Link to={"/products"}>Home</Link></li>
                    </ul>
                </div>
                <div className='flex items-center justify-center my-2 ml-auto gap-2'>
                    <div className='flex flex-row'>
                        <input
                        type="text"
                        placeholder="Search here"
                        value={search}
                        onChange={(event)=>setSearch(event.target.value)}
                        className=" outline-[#4A00FF] ml-2  rounded-l-lg border-[#4A00FF] border-2 rounded-r-none p-2  w-full max-w-xs" />
                        <button onClick={handleSearchBtn} className='btn btn-primary rounded-l-none text-whiet'>
                            <MagnifyingGlassIcon className="h-6 w-6  text-white"/>
                        </button>
                    </div>
                    <button className='btn-primary btn  text-white text-lg mr-4' onClick={openDrawer}>Filters</button>
                </div>

            </div>
            
            <div className="w-full py-4 flex flex-row items-center flex-wrap gap-4 lg:gap-6  justify-evenly ">
                {
                    products && products.length ?
                    products.map((item)=><div key={item._id} ><Product product={item}/></div>)
                    :<p className='mx-auto'>There are no Products found for you search</p>
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

            {
                products && lowestPrice && highestPrice ?
                    <Filters open={open} closeDrawer={closeDrawer} list={list} setList={setList} handleList={handleList} setProducts={setProducts} products={products} setDatabaseProducts={setDatabaseProducts} dataBaseProducts={dataBaseProducts} lowestPrice={lowestPrice} highestPrice={highestPrice}/>
                :null
            }
            
        </>
    )
}







