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
} from "@material-tailwind/react";
import {  Bars3Icon } from "@heroicons/react/24/solid";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"
import {
    setCart
} from "../../../store/userCart/userCartSlice"
import { ToastContainer, Zoom, toast } from 'react-toastify';


export default function CartItem({item}) {

    //Remove from Cart dialog box
    const [removeCartOpen, setRemoveCartOpen] = React.useState(false);
    const handleRemoveCartOpen = () => setRemoveCartOpen(!removeCartOpen);

    //Change count of cart dialog box
    const [changeCoutOfCartOpen, setChangeCountOfCartOpen] = React.useState(false);
    const handleChangeCountOfCartOpen = () => setChangeCountOfCartOpen(!changeCoutOfCartOpen);

    const [cartCount,setCartCount]=useState(item.count);

    const handleCartCountChange = (event)=>{
        setCartCount(event.target.value);
    }


    const dispatch=useDispatch();

    const handleRemoveFromCart = async ()=>{
        try{
            const token=localStorage.getItem("access_token");
            const res=await axios.put(`http://localhost:8080/user/removeFromCart/${item.product._id}`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data=await res.data;
            if(data.isSuccess){
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
            const token=localStorage.getItem("access_token");
            const res=await axios.put(`http://localhost:8080/user/changeCount/${item.product._id}`,{
                count:parseInt(cartCount)
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data=await res.data;
            if(data.isSuccess){
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

    

    return (
        <div className="p-4 gap-4 border-2 border-black text-lg text-black w-full my-4 rounded-lg flex items-center justify-start flex-wrap relative">
            <div className="w-full flex flex-row-reverse mb-[-60px] z-0">
                <Menu >
                    <MenuHandler>
                        <Bars3Icon className="w-7 h-7 border-black border-[1px] rounded-md" />
                    </MenuHandler>
                    <MenuList>
                        <MenuItem onClick={handleChangeCountOfCartOpen}>Change Count</MenuItem>
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
                            <Input type="number" label="Cart Count" value={cartCount} onChange={handleCartCountChange} />
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
            <div className="h-[200px] w-[250px] ">
                <img src={item.product.thumbnail} className="object-contain  h-full rounded-lg mx-auto" />
            </div>
            <div className="h-full flex flex-col">
                <div className="my-grid w-[425px] truncate" >
                    <b>Name </b><b className="w-2">:</b><p > {item.product.title}</p>
                    <b>Price </b><b>:</b><p> ${item.product.price}</p>
                    <b>Discount </b><b>:</b><p> {item.product.discountPercentage}%</p>
                    <b>FinalPrice </b><b>:</b><p> ${item.product.actualPrice}</p>
                </div>
            </div>
            
            <div className="my-grid2 w-[375px] self-end">
                <b>No of Items </b><b>:</b><p> {item.count}</p>
                <b>Total Price </b><b>:</b><p className="truncate"> ${(item.count*item.product.actualPrice).toFixed(2)}</p>
            </div>
         
        
        </div>
    )
}