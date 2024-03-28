import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import ImagesContainer from "./ImagesContainer";
import {Button} from "@material-tailwind/react"
import {Link} from "react-router-dom"

export default function SingleProduct(){
    const {productId}=useParams();
    const [product,setProduct]=useState(null);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        getProduct();
    },[])


    const getProduct=async ()=>{
        try{
            setLoading(true);
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
                    <Button size="md" variant="gradient" color="blue" className="rounded-full w-48 mt-4 text-xl" >Add To Cart       </Button>
                    <Button size="md" variant="gradient" color="blue" className="rounded-full w-48 mt-4 text-xl" >Buy Now</Button>
                </div>
                :null
            }
        </div>
    )
}