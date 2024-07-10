import "./CartItem.css";
import React, { useState } from "react";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Spinner
    
} from "@material-tailwind/react";
import {  Bars3Icon } from "@heroicons/react/24/solid";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"
import {
    setCart
} from "../../../store/userCart/userCartSlice"
import { ToastContainer, Zoom, toast } from 'react-toastify';
import ItemCartCount from "./ItemCartCount";
import {Link} from "react-router-dom";


export default function CartItem({item}) {


    //Remove from Cart dialog box
    const [removeCartOpen, setRemoveCartOpen] = React.useState(false);
    const handleRemoveCartOpen = () => setRemoveCartOpen(!removeCartOpen);

    //Change count of cart dialog box
    const [changeCoutOfCartOpen, setChangeCountOfCartOpen] = React.useState(false);
    const handleChangeCountOfCartOpen = () => setChangeCountOfCartOpen(!changeCoutOfCartOpen);

    const [cartCount,setCartCount]=useState(item.count);
    const [loading,setLoading]=useState(false);


    const dispatch=useDispatch();

    const handleRemoveFromCart = async ()=>{
        try{
            setLoading(true);
            const token=localStorage.getItem("access_token");
            const res=await axios.put(`/api/user/removeFromCart/${item.product._id}`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data=await res.data;
            if(data.isSuccess){
                setLoading(false);
                dispatch(setCart(data.cart));
                toast.success(data.message, {
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
            }else{
                setLoading(false);
                toast.error(data.message, {
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
            setLoading(false);
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
        handleRemoveCartOpen();
    }


    const handleChangeCount = async ()=>{
        try{
            setLoading(true);
            const token=localStorage.getItem("access_token");
            const res=await axios.put(`/api/user/changeCount/${item.product._id}`,{
                count:parseInt(cartCount)
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data=await res.data;
            if(data.isSuccess){
                setLoading(false);
                dispatch(setCart(data.cart));
                toast.success(data.message, {
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
            }else{
                setLoading(false);
                toast.error(data.message, {
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
            setLoading(false);
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
        handleChangeCountOfCartOpen();
    }

    
    if(loading){
        return (
            <div className=" w-full h-60 lg:w-[47%] flex items-center justify-center">
                <div className=" w-full flex items-center justify-center">
                    <Spinner className="h-16 w-16 text-gray-900/50" />
                </div>
            </div>
        )
    }
    

    return (
        <div className="p-4 gap-4 border-2  text-lg text-black w-full min-w-[315px]  my-4 rounded-xl shadow-lg hover:shadow-2xl  flex flex-col items-center  flex-wrap relative">
            <div className="w-full  flex flex-row-reverse mb-[-30px] z-0">
                <Menu allowHover="true">
                    <MenuHandler>
                        <Bars3Icon className="w-7 h-7  rounded-md" />
                    </MenuHandler>
                    <MenuList>
                        <MenuItem className="hover:bg-primary" onClick={handleChangeCountOfCartOpen}>Change Count</MenuItem>
                        <MenuItem onClick={handleRemoveCartOpen}>Remove From Cart</MenuItem>
                    </MenuList>
                </Menu>
                {/*remove from cart dialog box*/}
                <Dialog open={removeCartOpen} handler={handleRemoveCartOpen}>
                    <DialogHeader>Confirm Removal</DialogHeader>
                        <DialogBody>
                            <p>Are you sure you want to remove this item from your cart?</p>
                            <ul className="list-disc ml-8">
                                <li>Item Name : <b>{item.product.title}</b></li>
                                <li>Price : <b>${item.product.actualPrice.toFixed(2)}</b></li>
                                <li>No of Items : <b>{item.count}</b></li>
                            </ul>
                            <p>This action cannot be undone.</p>
                        </DialogBody>
                    <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleRemoveCartOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleRemoveFromCart}>
                        <span>Remove</span>
                    </Button>
                    </DialogFooter>
                </Dialog>
                 {/*change count of the cart*/}
                <Dialog open={changeCoutOfCartOpen} handler={handleChangeCountOfCartOpen}>
                    <DialogHeader>Change Item Quantity</DialogHeader>
                        <DialogBody>
                        <p>Update the quantity for the following item in your cart:</p>
                        <ul className="list-disc ml-8">
                            <li>Item Name : <b>{item.product.title}</b></li>
                            <li>Current Quantity : <b>{item.count}</b></li>
                        </ul>
                        <p className="bold">New Quantity:</p>
                        <div className="w-72 mt-4">
                            <ItemCartCount cartCount={cartCount} setCartCount={setCartCount} maxCount={item.product.stock}/>
                            {/* <Input type="number" label="Cart Count" value={cartCount} onChange={handleCartCountChange} min={1}/> */}
                        </div>
                        
                        </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleChangeCountOfCartOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={handleChangeCount}>
                            <span>Update</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between w-full gap-2">
                <div className=" flex items-center lg:justify-start justify-evenly">
                    <div className="h-[50px] w-[50px]  sm:h-[100px] sm:w-[150px] ">
                        <Link to={`/products/${item.product._id}`}><img src={item.product.thumbnail} className="object-contain  h-full rounded-lg mx-auto" /></Link>
                    </div>
                    <div className="mr-2">
                        <p className="truncate text-md sm:text-xl font-bold max-w-40 sm:max-w-60">{item.product.title}</p>
                        <p>{item.product.brand}</p>
                    </div>
                
                </div>
                <div className=" mr-auto  lg:ml-auto  ">
                    <div className="ml-auto my-grid2 w-[375px] text-md sm:text-lg ">
                        <b>No of Items </b><b>:</b><p> {item.count}</p>
                        <b>Total Price </b><b>:</b><p className="truncate"> ${(item.count*item.product.actualPrice).toFixed(2)}</p>
                    </div>
                </div>
         
           </div>
        
        </div>
    )
}