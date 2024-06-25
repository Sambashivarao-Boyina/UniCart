import axios from 'axios';
import React,{useState} from 'react'
import DataTable from "react-data-table-component";


export default function SellerOrders() {

    const [orders,setOrders]=useState([]);

    useEffect(async ()=>{
        try{
            const res=await axios.get("http://localhost:8080/seller/orders",{
                
            })
        }catch(error){
            console.log(error);
        }
    },[])

    return (
        <div>   
            Orders Page
        </div>
    )
}
