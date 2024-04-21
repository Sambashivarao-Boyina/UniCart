import { useEffect, useState } from 'react'
import './App.css'
import AddProduct from './Pages/AddProduct/AddProduct'
import Products from './Pages/Products/products'
import SingleProduct from './Pages/SingleProduct/SingleProduct'
import  ComplexNavbar from './includes/Headers/Navbar'
import {Routes,Route} from "react-router-dom"
import SignUp from './Pages/Signup/SignUp'
import SignIn from './Pages/SignIn/SignIn'
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"
import {signSuccess} from "../src/store/user/userSlice"
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            localStorage.setItem("access_token",data.token);
            dispatch(signSuccess(data.user));
          
        }catch(error){
            console.log(error.response.data.message);
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
                <Route exact path="/addproduct" element={<AddProduct/>}/>
                <Route exact path="/sign-up" element={<SignUp/>}/>
                <Route exact path="/sign-in" element={<SignIn/>}/>
            </Routes>
            
        </>
    )
}

export default App
