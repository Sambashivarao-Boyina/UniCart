import React,{useState} from 'react'
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option
} from "@material-tailwind/react";
import axios from 'axios';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TableRowMenu({orderID,setOrders}) {

    //Order Cancelation Confirm
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    

    
    const handleCancel = ()=>{
        handleRequest("Canceled");
        handleOpen();
    }

    const handleRequest = async (newStatus)=>{
        if(newStatus===""){
            return;
        }
        try{
                        
            const token=localStorage.getItem("access_token");
            const res=await axios.delete(`http://localhost:8080/user/orders/${orderID}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data=await res.data;
            if(data.isSuccess){
                setOrders(data.user.orders);
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
            <Menu>
                <MenuHandler>
                    <button > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </MenuHandler>
                <MenuList>
                
                    <MenuItem className='flex flex-row items-center text-red-600 hover:text-red-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        <span className='sm:text-lg' onClick={handleOpen}>Cancel Order</span>
                    </MenuItem>
                </MenuList>
            </Menu>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Cancel Order?</DialogHeader>
                <DialogBody>
                    Are you sure you want to cancel your order.
                </DialogBody>
                <DialogFooter>
                    <Button
                        color="green"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Keep Order</span>
                    </Button>
                    <Button variant='gradient' color="red" onClick={handleCancel}>
                        <span>Cancel Order</span>
                    </Button>
                </DialogFooter>
            </Dialog>

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
