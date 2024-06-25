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
import {signSuccess} from "../src/store/user/userSlice"
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInRoute from './PrivateRoutes/SignInRoute'
import { Authentication } from './Pages/Authetication/Authentication'
import SellerSignUp from './Pages/SellerPages/SellerSignUp/SellerSignUp'
import SellerSignIn from './Pages/SellerPages/SellerSignIn/SellerSignIn'
import SellerRoute from './PrivateRoutes/SellerRoute'
import {setCart} from "../src/store/userCart/userCartSlice"
import SellerProfilePage from './Pages/SellerPages/SellerProfilePage/SellerProfilePage'
import Cart from './Pages/UserPages/CartPage/Cart'
import SellerOrders from './Pages/SellerPages/SellerOrders/SellerOrders'


function App() {
    const dispatch=useDispatch();
    const refresh=async ()=>{
        const token=localStorage.getItem("access_token");
        try{
            const res=await axios.get("http://localhost:8080/auth/refreshToken",{
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
            <Routes>
                <Route exact path="/" element={<Products/>}/>
                <Route exact path="/products" element={<Products/>}/>
                <Route exact path="/singleProduct/:productId" element={<SingleProduct/>}/>
                <Route element={<SignInRoute/>}>
                    <Route exact path='/cart' element={<Cart/>}/>
                </Route>
                <Route element={<SellerRoute/>}>
                    <Route exact path="/addproduct" element={<AddProduct/>}/>
                </Route>
                <Route element={<SellerRoute/>}>
                    <Route exact path="/sellerProfile" element={<SellerProfilePage/>}/>
                </Route>
                <Route element={<SellerRoute/>}>
                    <Route exact path="/seller/orders" element={<SellerOrders/>}/>
                </Route>
        
                <Route exact path="/sign-up" element={<SignUp/>}/>
                <Route exact path="/sign-in" element={<SignIn/>}/>
                <Route exact path="/seller-sign-up" element={<SellerSignUp/>}/>
                <Route exact path="/seller-sign-in" element={<SellerSignIn/>}/>
                <Route exact path="/authentication" element={<Authentication/>}/>

            </Routes>
            
        </>
    )
}

export default App
