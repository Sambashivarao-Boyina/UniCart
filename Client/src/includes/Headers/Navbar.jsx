import { Link } from "react-router-dom";


export default function (){
    return (
        <nav className="sticky top-0 left-0 w-full  bg-black flex flex-row items-center justify-start px-4 py-2">
            <p className="text-white text-2xl font-black">EcomNest</p>
            <div className="ml-auto">
                <Link to={"/products"} className="text-white">Products</Link>
            </div>
            
        </nav>
    )
}