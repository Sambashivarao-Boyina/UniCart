import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SingleProduct(){
    const {productId} =useParams();
    const [product,setProduct]=useState({});

    useEffect(()=>{
        const data=getProduct();
        setProduct(data);
    },[])


    const getProduct=async ()=>{
        const res=await axios.get(`http://localhost:8080/product/${productId}`);
        const data=await res.data;
        console.log(data);
        return data.product;
    }

    
    return (
        <div>
            
            Product
        </div>
    )
}