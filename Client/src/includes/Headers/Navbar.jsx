import { Link } from "react-router-dom";


export default function (){
    return (
        <nav className="sticky top-0 left-0 w-full  bg-black flex flex-row items-center justify-start px-4 py-2 z-10">
            <p className="text-white text-2xl font-black">EcomNest</p>
            <div className="ml-auto flex gap-2">
                <Link to={"/products"} className="text-white">Products</Link>
                <Link to={"/addproduct"} className="text-white">Add Product</Link>
            </div>
            
        </nav>
    )
}