import './App.css'
import Products from './Pages/Products/products'
import SingleProduct from './Pages/SingleProduct/SingleProduct'
import Navbar from './includes/Headers/Navbar'
import {Routes,Route} from "react-router-dom"

function App() {

    return (
        <>
            <Navbar/>
            <Routes>
                <Route exact path="/products" element={<Products/>}/>
                <Route exact path="/singleProduct/:productId" element={<SingleProduct/>}/>
            </Routes>
        </>
    )
}

export default App
