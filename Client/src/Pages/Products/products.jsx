import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Product from './Product';
import { Link } from 'react-router-dom';

export default function Products(){
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        getProductsRequest();
                 
    },[]);
    
    const getProductsRequest=async ()=>{
        const res=await axios.get("http://localhost:8080/product/allProducts");
        const data=await res.data;
        setProducts(data.products);
    }

    return (
        <div className="p-4 flex flex-row  items-center  flex-wrap justify-evenly ">
            {
                products && products.length ?
                products.map((item)=><Link to={`/singleProduct/${item._id}`}><Product key={item._id} product={item}/></Link>)
                :null
            }
        </div>
    )
}







