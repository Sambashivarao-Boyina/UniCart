import axios from 'axios';
import React,{useState,useEffect} from 'react'
import DataTable from "react-data-table-component";
import OrdersTable from './OrdersTable';
import TableRowMenu from './TableRowMenu';
import AddressDialog from './AddressDialog';
import { Link } from 'react-router-dom';



export default function UserOrders() {

    const [orders,setOrders]=useState([]);
    const [loading,setLoading]=useState(false);



    const getProducts=async ()=>{
        const token=localStorage.getItem("access_token");
        setLoading(true);
        try{
            const res=await axios.get("/api/user/orders",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            const data=await res.data;
           
            setOrders(data.user.orders);
            setLoading(false);
            

        }catch(error){
            setLoading(false);
            console.log(error);
        }
    }
    useEffect( ()=>{
        getProducts();
    },[])
    

    const columns=[
        {   
            name: 'Thumbnail',
		    grow: 0,
		    cell: row => <Link to={`/products/${row.product._id}`}><img height="84px" width="56px" alt={row.name} src={row.product.thumbnail} /></Link>,
        },
        {
            name:"Product",
            cell: row => <Link to={`/products/${row.product._id}`}><p className='max-w-20 truncate'>{row.product.title}</p></Link>,

        },
        {
            name:"Count",
            selector:row=>row.noOfItems,
            sortable:true
        },
        {
            name:"Ordered Date",
            cell:row=><p>{row.orderedDate.substring(0,10)}</p>,
            selector:row=>row.noOfItems,
            sortable:true
        }, 
        {
            name:"Total Cost",
            cell:row=><p>${(row.product.actualPrice * row.noOfItems).toFixed(2)}</p>,
            selector:row=>row.product.actualPrice * row.noOfItems,
            sortable:true
        }, 
        {
            name:"OrderStatus",
            selector:row=>row.orderStatus,
            sortable:true,
            conditionalCellStyles:[
                {
                    when:row=>row.orderStatus=="OrderPlaced",
                    style:{
                        color:"Orange",
                        fontWeight:700
                    }
                },
                {
                    when:row=>row.orderStatus=="Packed",
                    style:{
                        color:"yellow",
                        fontWeight:700
                    }
                },
                {
                    when:row=>row.orderStatus=="Deliverd",
                    style:{
                        color:"green",
                        fontWeight:700
                    }
                },
                {
                    when:row=>row.orderStatus=="Canceled",
                    style:{
                        color:"red",
                        fontWeight:700
                    }
                }
            ]
        },
        {
            cell: row => <AddressDialog address={row.address}/>,
            allowOverflow: true,
            // button: true,
        },
        {
            cell: row => <TableRowMenu orderID={row._id} setOrders={setOrders} />,
            allowOverflow: true,
            button: true,
            width: '56px',
        },
    ]

    return (
        <>
            <div className="breadcrumbs text-sm -mb-8 lg:ml-20 ">
                <ul className='lg:text-lg'>
                    <li></li>
                    <li><Link to={"/products"}>Home</Link></li>
                    <li><Link to={"/user/orders"}>Orders</Link></li>
                </ul>
            </div>
            <OrdersTable 
                
                columns={columns}  
                data={orders}
                pending={loading}
            />;
        </>
    )
}
