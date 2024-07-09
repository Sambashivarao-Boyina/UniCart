import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import axios from "axios"
import {signOut} from "../../store/user/userSlice"
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Avatar,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Badge,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { HomeIcon,ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function (){
    const {currUser}=useSelector((state)=>state.user);
    const {cart}=useSelector((state)=>state.userCart);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const handleSignOut=async ()=>{
       
        try{
            
            localStorage.removeItem("access_token");
            dispatch(signOut());
            toast.success("Logged-Out successfully", {
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
            navigate("/products");  
            
        }catch(error){
            dispatch(signInFaliure(error.response.data.message));
        }
    }

    return (
        <nav className="sticky top-0  w-full bg-primary flex flex-row items-center justify-start pl-4 pr-2 md:pr-4 pb-2 pt-4 z-40">
            <Link className="text-white text-2xl font-black flex items-center gap-1" to={"/products"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>

                EcomNest
            </Link>

            <div className="ml-auto flex gap-4 items-center">
                {
                    currUser && currUser.type==="User" && cart ?
                        <Link to={"/cart"}>
                            <Badge content={cart && cart.length ? cart.length :0}>
                                <Tooltip content={
                                    <p className="text-lg">&nbsp;&nbsp;Cart&nbsp;&nbsp;</p>
                                }>
                                    <>
                                        <ShoppingCartIcon className="w-8  h-8 text-white"/>
                                    </>
                                </Tooltip>
                            </Badge>
                        </Link>
                    :null
                }
                {
                    (currUser  && currUser.type==="Seller") ?
                        <Menu >
                            <MenuHandler>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:size-8 text-white mr-4 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </MenuHandler>
                            <MenuList >
                                <Link to={"/seller/myproducts"} ><MenuItem>My Products </MenuItem></Link>
                                <Link to={"/seller/addproduct"} ><MenuItem>Add Product</MenuItem></Link> 
                                <Link to={"/seller/orders"} ><MenuItem>Orders </MenuItem></Link>
                                <MenuItem><p onClick={handleSignOut} className=" cursor-pointer ">Sign-Out</p></MenuItem> 
                            </MenuList>
                        </Menu>

                    :null
                }
                {
                    currUser && currUser.type==="User"?
                        <Menu >
                            <MenuHandler>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:size-8 text-white cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </MenuHandler>
                            <MenuList>
                                <Link to={"/user/orders"} ><MenuItem>Orders </MenuItem></Link>
                                <Link to={"/user/wishlist"}><MenuItem>WishList</MenuItem></Link>
                                <MenuItem><p onClick={handleSignOut} className=" cursor-pointer ">Sign-Out</p></MenuItem> 
                            </MenuList>
                        </Menu>
                        :null

                }
                {
                    currUser==null ?  
                        <Menu>
                            <MenuHandler>
                                <div className="border-2 rounded-full p-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="white" className="size-6 cursor-pointer">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                </svg>
                                </div>

                            </MenuHandler>
                            <MenuList>
                                <Link to={"/sign-in"}><MenuItem>User</MenuItem></Link>
                                <Link to={"/seller/sign-in"}><MenuItem>Seller</MenuItem></Link>
                            </MenuList>
                        </Menu>
                        
                    :null
                }
               

            </div>
            
        </nav>

    )
}