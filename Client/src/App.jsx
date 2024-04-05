import { useEffect, useState } from 'react'
import './App.css'
import AddProduct from './Pages/AddProduct/AddProduct'
import Products from './Pages/Products/products'
import SingleProduct from './Pages/SingleProduct/SingleProduct'
import   ComplexNavbar from './includes/Headers/Navbar'
import {Routes,Route} from "react-router-dom"

function App() {
    



    return (
        <>
            <ComplexNavbar/>
            <Routes>
                <Route exact path="/" element={<Products/>}/>
                <Route exact path="/products" element={<Products/>}/>
                <Route exact path="/singleProduct/:productId" element={<SingleProduct/>}/>
                <Route exact path="/addproduct" element={<AddProduct/>}/>
            </Routes>
        </>
    )
}

export default App
