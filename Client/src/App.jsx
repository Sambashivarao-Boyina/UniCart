import { useEffect, useState } from 'react'
import './App.css'
import AddProduct from './Pages/SellerPages/AddProduct/AddProduct'
import Products from './Pages/Products/products'
import SingleProduct from './Pages/SingleProduct/SingleProduct'
import  ComplexNavbar from './includes/Headers/Navbar'
import {Routes,Route} from "react-router-dom"
import SignUp from './Pages/UserPages/Signup/SignUp'
import SignIn from './Pages/UserPages/SignIn/SignIn'
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"
import {signSuccess} from "./store/user/userSlice"
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInRoute from './PrivateRoutes/SignInRoute'
import { Authentication } from './Pages/Authetication/Authentication'
import SellerSignUp from './Pages/SellerPages/SellerSignUp/SellerSignUp'
import SellerSignIn from './Pages/SellerPages/SellerSignIn/SellerSignIn'
import SellerRoute from './PrivateRoutes/SellerRoute'
import {setCart} from "./store/userCart/userCartSlice"
import Cart from './Pages/UserPages/CartPage/Cart'
import SellerOrders from './Pages/SellerPages/SellerOrders/SellerOrders'
import UserRoute from './PrivateRoutes/UserRoute'
import UserOrders from './Pages/UserPages/UserOrdersPage/UserOrders'
import WishList from './Pages/UserPages/WishList/WishList'
import SellerProducts from './Pages/SellerPages/SellerProducts/SellerProducts'
import PageNotFound from './Pages/PageNotFound/PageNotFound'


function App() {
    const dispatch=useDispatch();
    const refresh=async ()=>{
        const token=localStorage.getItem("access_token");
        try{
            const res=await axios.get("/api/auth/refreshToken",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const data=await res.data;
            if(data.isSuccess){
                localStorage.setItem("access_token",data.token);
                dispatch(signSuccess(data.user));
                dispatch(setCart(data.user.cart));
            }
          
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        refresh();
    },[])

    return (
        <>
            <ComplexNavbar/>
            <Routes >
                <Route  path="/" element={<Products/>}/>
                <Route  path="/products" element={<Products/>}/>
                <Route  path="/products/:productId" element={<SingleProduct/>}/>
                <Route  path="/sign-up" element={<SignUp/>}/>
                <Route  path="/sign-in" element={<SignIn/>}/>
                <Route  path="/seller/sign-up" element={<SellerSignUp/>}/>
                <Route  path="/seller/sign-in" element={<SellerSignIn/>}/>
                
                <Route element={<UserRoute/>}>
                    <Route  path='/user/orders' element={<UserOrders/>}/>
                    <Route  path='/user/wishlist' element={<WishList/>}/>
                    <Route  path='/cart' element={<Cart/>}/>
                </Route>

                <Route element={<SellerRoute/>}>
                    <Route  path="/seller/addproduct" element={<AddProduct/>}/>
                    <Route  path="/seller/myproducts" element={<SellerProducts/>}/>
                    <Route  path="/seller/orders" element={<SellerOrders/>}/>
                </Route>
                {/* <Route path="/authentication" element={<Authentication/>}/> */}

                <Route path="*" element={<PageNotFound/>}/>
            </Routes>       
        </>
    )
}

export default App
