import axios from 'axios';
import React,{useState,useEffect} from 'react'
import OrdersTable from './OrdersTable';
import TableRowMenu from './TableRowMenu';
import AddressDialog from './AddressDialog';
import {
	Button, Dialog, DialogBody, DialogFooter, DialogHeader, Menu, MenuHandler, MenuItem, MenuList
} from "@material-tailwind/react"
import { Link } from 'react-router-dom';


export default function SellerOrders() {

    const [orders,setOrders]=useState([]);
    const [loading,setLoading]=useState(false);

    //Delete Canceled Orders Dialog box
    const [open,setOpen]=useState(false);
    const handleOpen=()=>setOpen(!open);

    const [orderList,setOrdersList]=useState([]);

    const getProducts=async ()=>{

        console.log("getProducts");
        const token=localStorage.getItem("access_token");
        setLoading(true);
        try{
            const res=await axios.get("http://localhost:8080/seller/orders",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            const data=await res.data;
           
            setOrders(data.seller.orders);
            setOrdersList(data.seller.orders);
            setLoading(false);
            

        }catch(error){
            setLoading(false);
            console.log(error);
        }
    }
    useEffect( ()=>{
        getProducts();
    },[])

    const handleDataChange=(type)=>{
        if(type===""){
            setOrdersList(orders);
        }else{
            let data=orders.filter((order)=>order.orderStatus===type);
            setOrdersList(data);
        }   
    }

    //request for deleting canceled orders
    const handleCancelOrderDelete=async (req,res)=>{
        try{
            const token=localStorage.getItem("access_token");
            const res=await axios.delete("http://localhost:8080/seller/orders",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const data=await res.data;
            setOrdersList(data.orders);
        }catch(error){
            console.log(error);
        }
        handleOpen();
    }
    

    const columns=[
        {   
            name: 'Thumbnail',
		    grow: 0,
		    cell: row => <Link to={`/products/${row.product._id}`}><img height="84px" width="56px" alt={row.name} src={row.product.thumbnail} /></Link>,
        },
        {
            name:"Product",
		    cell: row => <Link to={`/products/${row.product._id}`}><p className=" max-w-20 truncate">{row.product.title}</p></Link>,            
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
            cell: row => <TableRowMenu orderID={row._id} setOrders={setOrders} setOrdersList={setOrdersList} />,
            allowOverflow: true,
            button: true,
            width: '56px',
        },
    ]

    return (
        <>
            <div className="breadcrumbs text-sm lg:ml-20 ">
                <ul className='lg:text-lg'>
                    <li></li>
                    <li><Link to={"/products"}>Home</Link></li>
                    <li><Link to={"/seller/orders"}>Orders</Link></li>
                </ul>
            </div>
            <div className='mx-auto p-4  mt-4 lg:w-10/12'>
                <div className='flex justify-between my-4'>
                    <h1 className="p-2 text-xl md:text-3xl font-bold">Order's Details:</h1>
                    <Menu>
                        <MenuHandler>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem onClick={()=>handleDataChange("")}>Show All</MenuItem>
                            <MenuItem onClick={()=>handleDataChange("OrderPlaced")}>Show Order Placed</MenuItem>
                            <MenuItem onClick={()=>handleDataChange("Packed")}>Show Packed</MenuItem>
                            <MenuItem onClick={()=>handleDataChange("Deliverd")}>Show Delivered</MenuItem>
                            <MenuItem onClick={()=>handleDataChange("Canceled")}>Show Canceled</MenuItem>
                            <hr className="my-3" />
                            <MenuItem onClick={handleOpen}>Delete All Canceled Orders</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
                <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>
                        Delete Canceled Orders (Permanently): 
                    </DialogHeader>
                    <DialogBody>
                        This option will permanently delete all canceled orders from your list.This action cannot be undone.
                    </DialogBody>
                    <DialogFooter className='gap-2'>
                        <Button onClick={handleOpen} color='green' className='flex items-center' variant='outline'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span>Cancel</span>
                        </Button>
                        <Button onClick={handleCancelOrderDelete} className='flex items-center ' color='red' variant='gradient'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5   ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <span>Delete</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            
                <OrdersTable 
                    
                    columns={columns}  
                    data={orderList}
                    pending={loading}
                />;
            </div>
        </>
    )
}
